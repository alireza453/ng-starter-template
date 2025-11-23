import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { LoginHistoryModel } from './sign-in-history.model';

@Injectable({
    providedIn: 'root',
})
export class SigninHistoryDialogService {
    visibleDialog: boolean = false;
    private _loginHistories: ReplaySubject<LoginHistoryModel[]> = new ReplaySubject<LoginHistoryModel[]>();

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}


    /**
     * Getter for messages
     */
    get loginHistories$(): Observable<LoginHistoryModel[]> {
        return this._loginHistories.asObservable();
    }


    /**
     * Get all Data
     */
    getAll(): Observable<LoginHistoryModel[]> {
        return this._httpClient.get<LoginHistoryModel[]>('api/common/loginHistory').pipe(
            tap((d) => {
                this._loginHistories.next(d);
            })
        );
    }

}
