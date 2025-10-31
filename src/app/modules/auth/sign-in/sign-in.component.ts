import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormControl,
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
import { AuthBasePartComponent } from '../base-part/auth-base-part.component';
import { LanguagesComponent } from '../../../layout/common/languages/languages.component';

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
            email: new FormControl('hughes.brian@company.com', {
                validators: [Validators.required, Validators.email],
            }),
            password: new FormControl('admin', {
                validators: [Validators.required],
            }),
            rememberMe: new FormControl(false),
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    get emailIsInvalid() {
        return (
            this.signInForm.controls.email.invalid &&
            this.signInForm.controls.email.dirty &&
            this.signInForm.controls.email.touched
        );
    }

    get passwordIsInvalid() {
        return (
            this.signInForm.controls.password.invalid &&
            this.signInForm.controls.password.dirty &&
            this.signInForm.controls.password.touched
        );
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
                email: this.signInForm.value.email,
                password: this.signInForm.value.password,
            })
            .subscribe(
                () => {
                    const redirectURL =
                        this._activatedRoute.snapshot.queryParamMap.get(
                            'redirectURL'
                        ) || '/signed-in-redirect';

                    this._router.navigateByUrl(redirectURL);
                },
                (response) => {
                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.signInResultAlert = this._translocoService.translate(
                        'invalid-username-or-password'
                    );

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
