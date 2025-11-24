import { PermissionService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-component',
    imports: [],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    constructor(private permissionService: PermissionService) {}

    ngOnInit(): void {
        console.log(
            this.permissionService.getGrantedPolicy('AbpIdentity.Roles.Create')
        );
    }
}
