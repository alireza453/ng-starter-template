import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Menu } from 'primeng/menu';
import { SelectButton } from 'primeng/selectbutton';
import { SummaryDataModel } from './summary-data.model';

@Component({
    selector: 'summary-card',
    standalone: true,
    imports: [
        Card,
        Menu,
        Button,
        PrimeTemplate,
        NgClass,
        SelectButton,
        FormsModule,
    ],
    templateUrl: './summary-card.component.html',
    styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
    @Input() summaryData: SummaryDataModel;

    stateOptions: MenuItem[] = [
        { label: 'امروز' },
        { label: '12 ساعت' },
        { label: '24 ساعت' },
    ];
}
