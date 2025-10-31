import { Component, inject, OnInit } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Subject, takeUntil } from 'rxjs';
import { LoginHistoryModel } from './sign-in-history.model';
import { SigninHistoryDialogService } from './signin-history-dialog.service';

@Component({
    selector: 'signin-history-dialog',
    standalone: true,
    imports: [Dialog, TableModule, Tag, TranslocoPipe],
    templateUrl: './signin-history-dialog.component.html',
    styleUrl: './signin-history-dialog.component.scss',
})
export class SigninHistoryDialogComponent implements OnInit {
    signInHistoryDialog = inject(SigninHistoryDialogService);

    closeSignInHistoryDialog() {
        this.signInHistoryDialog.visibleDialog = false;
    }

    loginHistoryData: LoginHistoryModel[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private _signInHistoryService: SigninHistoryDialogService) {}

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to message changes
        this._signInHistoryService.loginHistories$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((d: LoginHistoryModel[]) => {
                this.loginHistoryData = d;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
