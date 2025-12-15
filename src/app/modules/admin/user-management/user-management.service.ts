import {
    IdentityUserCreateDto,
    IdentityUserService,
    IdentityUserUpdateDto,
} from '@abp/ng.identity/proxy';
import {
    PermissionsService,
    UpdatePermissionsDto,
} from '@abp/ng.permission-management/proxy';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RolesManagementService } from '../roles-management/roles-management-service';

@Injectable({
    providedIn: 'root',
})
export class UserManagementService {
    constructor(
        private _http: HttpClient,
        private _abpUserService: IdentityUserService,
        private _abpPermissionService: PermissionsService,
        private _roleService: RolesManagementService
    ) {}

    getUsers() {
        return this._abpUserService
            .getList({ maxResultCount: 1000, skipCount: 0 })
            .pipe(
                map((result) => {
                    return result.items;
                })
            );
    }

    assignPermissionsToUser(
        providerName: string,
        providerKey: string,
        body: UpdatePermissionsDto
    ) {
        return this._abpPermissionService.update(
            providerName,
            providerKey,
            body
        );
    }

    createNewUser(input: IdentityUserCreateDto) {
        return this._abpUserService.create(input);
    }

    deleteUser(userId: string) {
        return this._abpUserService.delete(userId);
    }

    getUserRoles(userId: string) {
        return this._abpUserService.getRoles(userId).pipe(
            map((result) => {
                return result.items;
            })
        );
    }

    updateUser(userId, input: IdentityUserUpdateDto) {
        return this._abpUserService.update(userId, input);
    }

    getUser(userId: string) {
        return this._abpUserService.get(userId);
    }
}
