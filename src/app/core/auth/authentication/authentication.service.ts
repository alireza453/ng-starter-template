import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
    RegisterUserDto,
    RequestLoginDto,
    ResultLoginDto,
    User,
} from './authentication.types';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private _httpClient = inject(HttpClient);
    private _userInfo = new BehaviorSubject<User | null>(null);

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._userInfo.next(value);
    }

    get user$(): Observable<User> {
        return this._userInfo.asObservable();
    }

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */

    signIn(credentials: RequestLoginDto): Observable<ResultLoginDto> {
        return this._httpClient
            .post<ResultLoginDto>(
                `${environment.BASE_URL}/account/login`,
                credentials
            );
    }

    /**
     * Get the signed-in user profile
     */
    getUserProfile(): Observable<User> {
        return this._httpClient.get<User>(
            `${environment.BASE_URL}/account/my-profile`
        );
    }

    /**
     * Save signed-in user state in local storage
     * @param user
     */
    saveUserInLocalStorage(user: User): void {
        this.user = user;
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    /**
     * Load signed-in user state
     */
    loadUserFromLocalStorage(): Observable<User> {
        if (this._userInfo.value == null) {
            let fromLocal = localStorage.getItem('userInfo');
            if (fromLocal) {
                this.user = JSON.parse(fromLocal);
            }
        }
        return this.user$;
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        localStorage.removeItem('userInfo');

        this._httpClient
            .get(`${environment.BASE_URL}/account/logout`)
            .subscribe(() => {
                this.user = null;
            });

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: RegisterUserDto): Observable<any> {
        return this._httpClient.post(
            `${environment.BASE_URL}/account/register`,
            user
        );
    }

    /**
     *  Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this.user = response;
            })
        );
    }
}
