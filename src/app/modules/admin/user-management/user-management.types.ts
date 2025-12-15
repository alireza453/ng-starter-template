import { IdentityRoleDto, IdentityUserDto } from '@abp/ng.identity/proxy';

export interface UserWithRolesDto extends IdentityUserDto {

    roles : IdentityRoleDto[]
}
