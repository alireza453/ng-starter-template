import { Component } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'auth-base-part',
    standalone: true,
    imports: [
        TranslocoPipe,
        Button,
        Checkbox,
        IconField,
        InputIcon,
        InputText,
        Message,
        ReactiveFormsModule,
    ],
    templateUrl: './auth-base-part.component.html',
    styleUrl: './auth-base-part.component.scss',
})
export class AuthBasePartComponent {}
