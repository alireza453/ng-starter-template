import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { Toast } from 'primeng/toast';
import { Tree } from 'primeng/tree';
import { RolesManagementService } from '../../roles-management/roles-management-service';
import { UserManagementService } from '../../user-management/user-management.service';

@Component({
    selector: 'permissions-tree',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [Tree, Drawer, Toast, Button],
    templateUrl: './permissions-tree.html',
    providers: [MessageService],
})
export class PermissionsTree {
    permissionsDrawerVisible: boolean = false;
    permissionsList!: TreeNode[];
    selectedPermissions!: TreeNode[];

    @Input() providerName: 'U' | 'R';
    @Input() providerKey: string; //roleName | userId
    @Input() roleName?: string;
    @Input() userId?: string;
    @Input() entityFlag: 'role' | 'user';

    constructor(
        private _roleService: RolesManagementService,
        private _messageService: MessageService,
        private _userManagementService :UserManagementService
    ) {}

    showPermissionsDialog() {
        this.permissionsDrawerVisible = true; //show dialog
        this.getPermissions();
    }

    /**
     * get All permissions by selecting specific role/user and show as tree
     * @private
     */
    private getPermissions() {
        this._roleService
            .getAllPermissions(this.providerName, this.providerKey)
            .subscribe((result) => {
                this.permissionsList = result.rootNodes;
                this.selectedPermissions = result.selectedNodes;
            });
    }

    syncSelect($event) {
        if (this.entityFlag === 'role') {
            const selectedKeys = new Set(
                this.selectedPermissions.map((x) => x.key)
            );
            const allNodes = this.flattenTree(this.permissionsList);

            const payload = {
                permissions: allNodes.map((node) => ({
                    name: node.key,
                    isGranted: selectedKeys.has(node.key),
                })),
            };
            this.saveRolesPermissions(payload);
        }else {
            const selectedKeys = new Set(
                this.selectedPermissions.map((x) => x.key)
            );
            const allNodes = this.flattenTree(this.permissionsList);

            const userPayload = {
                permissions: allNodes.map((node) => ({
                    name: node.key,
                    isGranted: selectedKeys.has(node.key),
                })),
            };
            this.saveUsersPermissions(userPayload);
        }




    }

    private flattenTree(nodes: TreeNode[]): TreeNode[] {
        const result: TreeNode[] = [];

        const walk = (items: TreeNode[]) => {
            for (const n of items) {
                result.push(n);
                if (n.children?.length) walk(n.children);
            }
        };

        walk(nodes);
        return result;
    }

    saveRolesPermissions(body) {
        this._roleService
            .assignPermissionsToRole(this.providerName,this.providerKey, body)
            .subscribe((d) => {
                this._messageService.add({
                    severity: 'info',
                    summary: 'اختصاص دسترسی',
                    detail: 'دسترسی به نقش بروزرسانی شد',
                });
            });
    }

    saveUsersPermissions(body) {
        this._userManagementService
            .assignPermissionsToUser(this.providerName,this.providerKey, body)
            .subscribe((d) => {
                this._messageService.add({
                    severity: 'info',
                    summary: 'اختصاص دسترسی',
                    detail: 'دسترسی به نقش بروزرسانی شد',
                });
            });
    }
}
