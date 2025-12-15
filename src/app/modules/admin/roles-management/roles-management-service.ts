import { IdentityRoleService } from '@abp/ng.identity/proxy';
import {
    PermissionsService,
    UpdatePermissionsDto,
} from '@abp/ng.permission-management/proxy';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RolesManagementService {
    constructor(
        private _http: HttpClient,
        private _abpRoleService: IdentityRoleService,
        private _abpPermissionService: PermissionsService,
    ) {
    }

    getAllRoles() {
        return this._abpRoleService
            .getList({ maxResultCount: 10, skipCount: 0 })
            .pipe(
                map((result) => {
                    return result.items;
                }),
            );
    }

    createRole(roleName: string) {
        return this._abpRoleService.create({
            name: roleName,
            isDefault: false,
            isPublic: false,
        });
    }

    deleteRole(roleId: string) {
        return this._abpRoleService.delete(roleId);
    }

    updateRole(roleId: string, roleName: string) {
        return this._abpRoleService.update(roleId, {
            name: roleName,
            isDefault: false,
            isPublic: false,
        });
    }

    assignPermissionsToRole(
        providerName:string,
        providerKey: string,
        body: UpdatePermissionsDto,
    ) {
        return this._abpPermissionService.update(
            providerName,
            providerKey,
            body,
        );
    }

    getAllPermissions(providerName: string, providerKey: string) {
        return this._abpPermissionService.get(providerName, providerKey)
            .pipe(
                map((result) => {
                    const rootNodes = result.groups.map((group): TreeNode => {
                        return {
                            label: group.displayName,
                            key: group.name,
                            selectable:false,
                            expanded:true,
                            children: group.permissions.map(
                                (permission): TreeNode => {
                                    return {
                                        key: permission.name,
                                        label: permission.displayName,
                                        data: permission.isGranted,
                                    };
                                },
                            ),
                        };
                    });
                    const selectedNodes = result.groups
                        .flatMap((group) => group.permissions)
                        .filter((d) => d.isGranted == true)
                        .map(x => ({
                            key: x.name,
                            label: x.displayName,
                            data: true,
                        }));

                    return { rootNodes, selectedNodes };
                }),
            );
    }

    getAssignableRoles() {
        return this._abpRoleService.getAllList();
    }
}
