import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { AuthenticationService } from 'app/core/auth/authentication/authentication.service';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { switchMap, throwError } from 'rxjs';
import { LanguagesComponent } from '../../../layout/common/languages/languages.component';
import { AuthBasePartComponent } from '../base-part/auth-base-part.component';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrl: 'sign-in.component.scss',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        Message,
        InputText,
        IconField,
        InputIcon,
        Button,
        Checkbox,
        TranslocoPipe,
        AuthBasePartComponent,
        LanguagesComponent,
    ],
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    signInResultAlert: string = '';
    showAlert: boolean = false;
    signInForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthenticationService,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _translocoService: TranslocoService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            userNameOrEmailAddress: ['', [Validators.required]],
            password: ['', [Validators.required]],
            rememberMe: [false],
        });
    }

    /**
     * Username field validation
     */
    get username() {
        return this.signInForm.get('userNameOrEmailAddress');
    }

    get usernameRequiredError() {
        return (
            (this.username.touched || this.username.dirty) &&
            this.username.errors?.required
        );
    }

    /**
     * Password field validation
     */
    get password() {
        return this.signInForm.get('password');
    }

    get passwordRequiredError(): boolean {
        return (
            (this.password.touched || this.password.dirty) &&
            this.password.errors?.required
        );
    }

    /**
     * RememberMe field
     */
    get rememberMe() {
        return this.signInForm.get('rememberMe');
    }

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService
            .signIn({
                userNameOrEmailAddress: this.username.value,
                password: this.password.value,
                rememberMe: this.rememberMe.value,
            })
            .pipe(
                switchMap((res) => {
                    if (res.result == 1) {
                        return this._authService.getUserProfile();
                    }else {

                    return throwError(() => new Error('something-went-wrong'));
                    }

                })
            )
            .subscribe({
                next: (user) => {
                    const redirectURL =
                        this._activatedRoute.snapshot.queryParamMap.get(
                            'redirectURL'
                        ) || '/signed-in-redirect';


                    this._authService.saveUserInLocalStorage(user);
                    this._router.navigateByUrl(redirectURL);
                },
                error: (err) => {
                    this.signInErrorAction(
                        this._translocoService.translate('something-went-wrong')
                    );
                },
            });
    }

    /**
     Private Methods
     */
    signInErrorAction(alertMessage: string) {
        // Re-enable the form
        this.signInForm.enable();
        // Reset the form
        this.signInNgForm.resetForm();
        // Set the alert
        this.signInResultAlert = alertMessage;
        // Show the alert
        this.showAlert = true;
    }
}
