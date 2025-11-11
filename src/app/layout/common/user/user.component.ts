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
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
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
import { Popover } from 'primeng/popover';
import { Divider } from 'primeng/divider';
import { Menu } from 'primeng/menu';

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
        NgClass,
        SigninHistoryDialogComponent,
        Menu,
        TranslocoPipe,
    ],
})
export class UserComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: User;
    userMenuItems: MenuItem[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private _translocoService: TranslocoService,
        private _signInHistoryDialog: SigninHistoryDialogService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the user service
        this._userService
            .getUserProfile()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
            });

        this.userMenuItems = [
            {
                separator: true,
            },
            {
                label: 'account',
                icon: 'fa-regular fa-user',
            },
            {
                label:'signin-history',
                icon: 'fa-regular fa-user',
                command: (event) => {
                    this._signInHistoryDialog.visibleDialog = true;
                },
            }
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
     * Sign out
     */
    signOut(): void {
        this._router.navigate(['/sign-out']);
    }

}
