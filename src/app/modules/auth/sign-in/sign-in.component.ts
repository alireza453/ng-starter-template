import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { AuthService } from 'app/core/auth/auth.service';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
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
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
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
        private _authService: AuthService,
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
            userNameOrEmailAddress: ['admin', [Validators.required]],
            password: ['1q2w3E*', [Validators.required]],
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

        const body = new HttpParams()
            .set('grant_type', 'password')
            .set('username', this.username.value)
            .set('password', this.password.value)
            .set('client_id', 'RavanYar_App')
            .set('scope', 'openid profile email phone offline_access RavanYar');

        // Sign in
        this._authService.signIn(body).subscribe({
            next: (response) => {
                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';

                this._router.navigateByUrl(redirectURL);
            },
            error: (err) => {
                console.log(err);
                // this.signInErrorAction(
                //     this._translocoService.translate(
                //         'invalid-username-or-password'
                //     )
                // );
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
