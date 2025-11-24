import { Component } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'auth-base-part',
    imports: [
        TranslocoPipe,
        ReactiveFormsModule,
    ],
    templateUrl: './auth-base-part.component.html',
    styleUrl: './auth-base-part.component.scss'
})
export class AuthBasePartComponent {}
