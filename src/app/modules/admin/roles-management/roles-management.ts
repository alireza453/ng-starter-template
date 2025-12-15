import { IdentityRoleDto } from '@abp/ng.identity/proxy';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';

import { Drawer } from 'primeng/drawer';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { Tree } from 'primeng/tree';
import { PermissionsTree } from '../shared/permissions-tree/permissions-tree';
import { RolesManagementService } from './roles-management-service';

@Component({
    selector: 'app-roles-management',
    imports: [
        Card,
        TableModule,
        IconField,
        InputIcon,
        FormsModule,
        Button,
        InputText,
        Dialog,
        Toast,
        ListboxModule,
        PermissionsTree,
    ],
    templateUrl: './roles-management.html',
    styleUrl: './roles-management.scss',
    providers: [MessageService],
})
export class RolesManagement implements OnInit {
    rolesList!: IdentityRoleDto[];
    searchValue: string;

    newEditRoleDialogVisible: boolean = false;

    roleInput!: string;
    dialogHeader!: string;
    dialogMode: 'create' | 'edit';
    selectedRoleId!: string;

    constructor(
        private _roleService: RolesManagementService,
        private _messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getRoles();
    }

    /**
     * Clear Data table filter
     * @param dt
     */
    clear(dt: Table) {
        dt.clear();
        this.searchValue = '';
    }

    /**
     *show newRole Dialog
     */
    showNewRoleDialog() {
        this.newEditRoleDialogVisible = true;
        this.dialogHeader = 'افزودن نقش';
        this.roleInput = '';
        this.dialogMode = 'create';
    }

    /**
     * show editRole Dialog
     */
    showEditRoleDialog(role) {
        this.newEditRoleDialogVisible = true;
        this.dialogHeader = 'ویرایش نقش';
        this.roleInput = role.name;
        this.selectedRoleId = role.id;
        this.dialogMode = 'edit';
    }

    /**
     * Create New Role or Update
     */
    saveRole() {
        if (this.dialogMode == 'create') {
            this._roleService.createRole(this.roleInput).subscribe(() => {
                this.getRoles();
                this._messageService.add({
                    severity: 'info',
                    summary: 'ایجاد نقش',
                    detail: 'با موفقیت اضافه شد',
                });
            });
        } else {
            //edit
            this._roleService
                .updateRole(this.selectedRoleId, this.roleInput)
                .subscribe(() => {
                    this.getRoles();
                    this._messageService.add({
                        severity: 'info',
                        summary: 'ایجاد نقش',
                        detail: 'با موفقیت ویرایش شد',
                    });
                });
            this.getRoles();
        }
        this.newEditRoleDialogVisible = false;
    }

    /**
     * Delete Role
     * @param role
     */
    deleteRole(role) {
        this._roleService.deleteRole(role.id).subscribe(() => {
            this.getRoles();
            this._messageService.add({
                severity: 'info',
                summary: 'حذف نقش',
                detail: 'با موفقیت حذف شد',
            });
        });
    }

    /**
     * get All Roles in Table
     * @private
     */
    private getRoles() {
        this._roleService.getAllRoles().subscribe((roles) => {
            this.rolesList = roles;
        });
    }
}
