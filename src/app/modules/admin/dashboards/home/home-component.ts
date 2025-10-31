import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButton, SelectButtonModule } from 'primeng/selectbutton';
import { AuthService } from '../../../../core/auth/auth.service';
import { SigninHistoryDialogComponent } from '../../../auth/signin-history/signin-history-dialog.component';

@Component({
    selector: 'app-home-component',
    standalone: true,
    imports: [
        FloatLabelModule,
        InputTextModule,
        FormsModule,
        SelectButtonModule,
        FormsModule,
        SelectButton,
        SigninHistoryDialogComponent,
    ],
    templateUrl: './home.component.html',
})
export class HomeComponent {
   authService = inject(AuthService);

}
