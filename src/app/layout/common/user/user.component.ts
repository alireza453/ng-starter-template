import { BooleanInput } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';

import { Router } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RippleModule } from 'primeng/ripple';
import { Subject } from 'rxjs';
import { SigninHistoryDialogComponent } from '../../../modules/auth/signin-history/signin-history-dialog.component';
import { SigninHistoryDialogService } from '../../../modules/auth/signin-history/signin-history-dialog.service';

import { ConfigStateService, CurrentUserDto } from '@abp/ng.core';
import { Menu } from 'primeng/menu';
import { AuthenticationService } from '../../../core/auth/authentication/authentication.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
    imports: [
        ButtonModule,
        BadgeModule,
        RippleModule,
        AvatarModule,
        OverlayBadgeModule,
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
    user: CurrentUserDto;
    userMenuItems: MenuItem[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _translocoService: TranslocoService,
        private _authService: AuthenticationService,
        private _signInHistoryDialog: SigninHistoryDialogService,
        private _abpConfigStateService: ConfigStateService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        //Subscribe to the user service
        this._abpConfigStateService.getAll$().subscribe({
            next: (data) => {
                this.user = data.currentUser;
            },
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
                label: 'signin-history',
                icon: 'fa-regular fa-user',
                command: (event) => {
                    this._signInHistoryDialog.visibleDialog = true;
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
     * Sign out
     */
    signOut(): void {
this._router.navigate(['/sign-out']);
    }
}
