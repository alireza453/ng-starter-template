import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormGroup,
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
import { TranslocoPipe } from '@ngneat/transloco';
import { AuthenticationService } from 'app/core/auth/authentication/authentication.service';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { AuthBasePartComponent } from '../base-part/auth-base-part.component';
import { AuthValidationService } from '../auth-validation.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
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
        TranslocoPipe,
        AuthBasePartComponent,
        Button,
        Checkbox,
        IconField,
        InputIcon,
        InputText,
    ],
})
export class AuthSignUpComponent implements OnInit {
    alert: { type: 'success' | 'error'; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    constructor(
        private _authService: AuthenticationService,
        private _activatedRoute: ActivatedRoute,
        private _authValidation:AuthValidationService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group(
            {
                userName: ['', [Validators.required]],
                emailAddress: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]],
                agreements: [false, Validators.requiredTrue],
            },
            {
                validators: this._authValidation.MatchPassword('password','confirmPassword'),
            }
        );
    }

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService
            .signUp({
                userName: this.username.value,
                emailAddress: this.email.value,
                password: this.password.value,
                appName: 'Ravanyar',
            })
            .subscribe(
                (response) => {
                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');
                },
                (response) => {
                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    //this.signUpForm.reset();

                    console.log(response);
                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'something-went-wrong',
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    /**
     Name Input Validation
     */
    get username() {
        return this.signUpForm.get('userName');
    }

    get usernameIsInvalid() {
        return (
            (this.username.touched || this.username.dirty) &&
            this.username.invalid
        );
    }

    /**
     Email Input Validation
     */
    get email() {
        return this.signUpForm.get('emailAddress');
    }

    get emailRequiredError() {
        return (this.email.touched || this.email.dirty) && this.email.errors?.required;
    }
    get emailInvalidError() {
        return (this.email.touched || this.email.dirty) && this.email.errors?.email;
    }

    /**
     Password Input Validation
     */
    get password() {
        return this.signUpForm.get('password');
    }

    get passwordRequiredError(): boolean {
        return (
            (this.password.touched || this.password.dirty) &&
            this.password.errors?.required
        );
    }
    get passwordMinlengthError(): boolean {
        return (
            (this.password.touched || this.password.dirty) &&
            this.password.errors?.minlength
        );
    }

    /**
     Confirm Password Input Validation
     */
    get confirmPassword() {
        return this.signUpForm.get('confirmPassword');
    }

    get confirmPasswordRequiredError() {
        return (
            (this.confirmPassword.touched || this.confirmPassword.dirty) &&
            this.confirmPassword.errors?.required
        );
    }
    get confirmPasswordMismatchError() {
        return (
            (this.confirmPassword.touched || this.confirmPassword.dirty) &&
            this.confirmPassword.errors?.passwordMismatch
        );
    }

    /**
     *  Private Methods*/
    _CheckPasswords(f: FormGroup) {
        const password = f.get('password')?.value;
        const confirm = f.get('confirmPassword')?.value;
        if (password !== confirm) {
            f.get('confirmPassword').setErrors({
                passwordMismatch: true,
            });
        } else {
            return null;
        }
    }
}
