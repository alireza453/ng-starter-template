import { AuthService } from '@abp/ng.core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RegisterUserDto, RequestLoginDto, User } from './authentication.types';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(
        private _httpClient: HttpClient,
        private _abpAuthService: AuthService
    ) {}

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

    signIn(credentials: RequestLoginDto): Observable<any> {
        return this._abpAuthService.login(credentials);
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
    signOut() {
         this._abpAuthService.logout();
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: RegisterUserDto): Observable<any> {
        return this._httpClient.post(
            `${environment.BASE_API}/account/register`,
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
