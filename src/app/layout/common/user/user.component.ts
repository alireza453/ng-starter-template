import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    computed,
    signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RippleModule } from 'primeng/ripple';
import { TieredMenu } from 'primeng/tieredmenu';
import { Subject, takeUntil } from 'rxjs';
import { SigninHistoryDialogComponent } from '../../../modules/auth/signin-history/signin-history-dialog.component';
import { UserStatus } from './user-status.mode';
import { SigninHistoryDialogService } from '../../../modules/auth/signin-history/signin-history-dialog.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        ButtonModule,
        MatDividerModule,
        BadgeModule,
        RippleModule,
        AvatarModule,
        OverlayBadgeModule,
        TieredMenu,
        TranslocoPipe,
        NgIf,
        NgClass,
        SigninHistoryDialogComponent,
    ],
})
export class UserComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: User;
    _currentUserStatus = signal<UserStatus>('Online');
    userMenuItems: MenuItem[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private _signInHistoryDialog:SigninHistoryDialogService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to user changes
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this.userMenuItems = [
            {
                label: 'account',
            },
            {
                label: 'signin-history',
                command: (event) => {
                  this._signInHistoryDialog.visibleDialog=true;
                },
            },
            {
                label: 'status',
                items: [
                    {
                        label: 'online',
                        icon: 'w-3 h-3 rounded-full bg-green-500',
                        command: (event) => {
                            this._currentUserStatus.set('Online');
                            this.updateUserStatus('Online');
                        },
                    },
                    {
                        label: 'busy',
                        icon: 'w-3 h-3 rounded-full bg-amber-500',
                        command: (event) => {
                            this._currentUserStatus.set('Busy');
                            this.updateUserStatus('Busy');
                        },
                    },
                    {
                        label: 'offline',
                        icon: 'w-3 h-3 rounded-full bg-red-500',
                        command: (event) => {
                            this._currentUserStatus.set('Offline');
                            this.updateUserStatus('Offline');
                        },
                    },
                ],
            },
            {
                separator: true,
            },
            {
                label: 'sign-out',
                icon: 'fa-regular fa-regular fa-arrow-right-from-bracket ltr:rotate-180 text-red-500',
                styleClass: 'text-red-500 ',
                command: () => {
                    this.signOut();
                },
            },
        ];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void {
        // Return if user is not available
        if (!this.user) {
            return;
        }
        // Update the user
        this._userService
            .update({
                ...this.user,
                status,
            })
            .subscribe();
    }

    /**
     * Sign out
     */
    signOut(): void {
        this._router.navigate(['/sign-out']);
    }

    /*
    chang color of user button badge depending on status
     */
    getUserStatus = computed(() => {
        switch (this._currentUserStatus()) {
            case 'Online':
                return 'bg-green-500';
            case 'Busy':
                return 'bg-amber-500';
            case 'Offline':
                return 'bg-red-500';
        }
    });

    /*
    chang severity of user button depending on status
     */
    getUserStatusColor = computed(() => {
        switch (this._currentUserStatus()) {
            case 'Online':
                return 'success';
            case 'Busy':
                return 'warn';
            case 'Offline':
                return 'danger';
        }
    });
}
