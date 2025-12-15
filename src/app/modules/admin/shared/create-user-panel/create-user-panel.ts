import { IdentityUserDto } from '@abp/ng.identity/proxy';
import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Toast } from 'primeng/toast';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Tree } from 'primeng/tree';
import { map, switchMap } from 'rxjs';
import { RolesManagementService } from '../../roles-management/roles-management-service';
import { UserManagementService } from '../../user-management/user-management.service';

@Component({
    selector: 'create-user-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        Button,
        Drawer,
        Toast,
        Tree,
        FloatLabel,
        InputText,
        ReactiveFormsModule,
        Tab,
        TabList,
        TabPanel,
        TabPanels,
        Tabs,
        ToggleSwitch,
        NgClass,
        ProgressSpinner,
    ],
    templateUrl: './create-user-panel.html',
    providers: [MessageService],
})
export class CreateUserPanel implements OnInit {
    visiblePanel: boolean = false;

    //all available roles
    rolesList!: TreeNode[];
    selectedRoles!: TreeNode[];

    @Input() panelMode: 'insertUser' | 'editUser';
    @Output() userChanged = new EventEmitter();
    @Input() panelHeader: string;
    @Input() user?: IdentityUserDto;

    userInfoForm: FormGroup;
    currentUserInfo: IdentityUserDto;

    //loading = signal<boolean>(false);

    constructor(
        private _messageService: MessageService,
        private _roleService: RolesManagementService,
        private _userManagementService: UserManagementService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.userInfoForm = this._formBuilder.group({
            userName: ['', [Validators.required]],
            name: [''],
            surname: [''],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: [''],
            password: [''],
            isActive: [false],
        });
    }

    openPanel() {
        this.visiblePanel = true;
        this.getAssignableRoles();
        if (this.panelMode === 'editUser') {
            this.userInfoForm.get('password')?.clearValidators();
            this.userInfoForm.get('password')?.updateValueAndValidity();
            this.fetchCurrentUser();
        } else {
            this.userInfoForm
                .get('password')
                ?.setValidators(Validators.required);
            this.userInfoForm.get('password')?.updateValueAndValidity();
        }
    }

    /**
     * get Assignable Role
     */
    getAssignableRoles() {
        //this.loading.set(true);
        this._roleService
            .getAssignableRoles()
            .pipe(
                map((result) => {
                    return result.items.map((item): TreeNode => {
                        return {
                            label: item.name,
                            key: item.id,
                        };
                    });
                })
            )
            .subscribe((d) => {
                this.rolesList = d;
                //this.loading.set(false);
            });
    }

    /**
     * handle form and post data
     */
    applyChange() {
        if (this.userInfoForm.invalid) {
            return;
        }
        if (this.panelMode === 'insertUser') {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    /**
     * selected roles as string[]
     */
    get roleNames(): string[] {
        return this.selectedRoles ? this.selectedRoles.map((r) => r.label) : [];
    }

    /**
     * create user
     */
    createUser() {
        this._userManagementService
            .createNewUser({
                userName: this.userInfoForm.get('userName').value,
                name: this.userInfoForm.get('name').value,
                surname: this.userInfoForm.get('surname').value,
                email: this.userInfoForm.get('email').value,
                password: this.userInfoForm.get('password').value,
                phoneNumber: this.userInfoForm.get('phoneNumber').value,
                isActive: this.userInfoForm.get('isActive').value,
                lockoutEnabled: true,
                roleNames: this.roleNames,
            })
            .subscribe((d) => {
                this.visiblePanel = false;
                this.userChanged.emit();
                this._messageService.add({
                    severity: 'success',
                    summary: 'پیام',
                    detail: 'کاربر جدید با موفقیت ایجاد شد',
                });
            });
    }

    /**
     * update user
     */
    updateUser() {
        this._userManagementService
            .updateUser(this.user.id, {
                userName: this.userInfoForm.get('userName').value,
                name: this.userInfoForm.get('name').value,
                surname: this.userInfoForm.get('surname').value,
                email: this.userInfoForm.get('email').value,
                phoneNumber: this.userInfoForm.get('phoneNumber').value,
                isActive: this.userInfoForm.get('isActive').value,
                lockoutEnabled: true,
                roleNames: this.roleNames,
            })
            .subscribe((d) => {
                this.visiblePanel = false;
                this.userChanged.emit();
                this._messageService.add({
                    severity: 'success',
                    summary: 'پیام',
                    detail: 'اطلاعات کاربر با موفقیت بروزرسانی شد',
                });
            });

    }

    private fetchCurrentUser() {
        //this.loading.set(true);
        this._userManagementService
            .getUser(this.user.id)
            .pipe(
                map((user) => {
                    this.currentUserInfo = user;
                    this.userInfoForm.patchValue({
                        userName: user.userName,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        isActive: user.isActive,
                    });
                    return user;
                }),
                switchMap((user) => {
                    return this._userManagementService
                        .getUserRoles(user.id)
                        .pipe(
                            map((roles) => {
                                return roles.map((role): TreeNode => {
                                    return {
                                        key: role.id,
                                        label: role.name,
                                    };
                                });
                            })
                        );
                })
            )
            .subscribe((roles) => {
                this.selectedRoles = roles;
                //this.loading.set(false);
            });
    }

}
