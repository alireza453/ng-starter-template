import { ShortDateTimePipe } from '@abp/ng.core';
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { forkJoin, map, switchMap } from 'rxjs';
import { CreateUserPanel } from '../shared/create-user-panel/create-user-panel';
import { PermissionsTree } from '../shared/permissions-tree/permissions-tree';
import { UserManagementService } from './user-management.service';
import { UserWithRolesDto } from './user-management.types';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'user-management',
    imports: [
        TableModule,
        Card,
        Button,
        MultiSelectModule,
        ShortDateTimePipe,
        IconField,
        InputIcon,
        InputText,
        FormsModule,
        CommonModule,
        NgClass,
        PermissionsTree,
        ReactiveFormsModule,
        Toast,
        CreateUserPanel,
        Tag,
    ],
    templateUrl: './user-management.html',
    providers: [MessageService],
})
export class UserManagement implements OnInit {
    users!: UserWithRolesDto[];
    searchValue: string | undefined;

    constructor(
        private _userManagementService: UserManagementService,
        private _messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getAllUsers();
    }

    /**
     * Clear Table Filters
     * @param table
     */
    clear(table: Table) {
        table.clear();
        this.searchValue = '';
    }

    /**
     * get All Users
     * @private
     */
    private getAllUsers() {
        this._userManagementService
            .getUsers()
            .pipe(
                switchMap((users) =>
                    forkJoin(
                        users.map((user) => {
                            return this._userManagementService
                                .getUserRoles(user.id)
                                .pipe(
                                    map((roles) => ({
                                        ...user,
                                        roles,
                                    }))
                                );
                        })
                    )
                )
            )
            .subscribe((d) => {
                this.users = d;
            });
    }

    /**
     * Delete User
     */
    deleteUser(user) {
        this._userManagementService.deleteUser(user.id).subscribe((result) => {
            this._messageService.add({
                severity: 'success',
                summary: 'حذف',
                detail: 'کاربر باموفقیت حذف شد',
            });

            this.getAllUsers();
        });
    }

    onUserChanged() {
        this.getAllUsers();
    }
}
