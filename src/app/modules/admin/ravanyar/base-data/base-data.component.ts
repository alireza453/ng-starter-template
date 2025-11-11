import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { items } from '../../../../mock-api/apps/file-manager/data';
import { BaseDataCategory, BaseDataItem } from './base-data.model';
@Component({
    selector: 'base-data',
    standalone: true,
    imports: [
        Select,
        FormsModule,
        FloatLabel,
        InputTextModule,
        Button,
        FieldsetModule,
        TableModule,
    ],
    templateUrl: './base-data.component.html',
    styleUrl: './base-data.component.scss',
})
export class BaseDataComponent implements OnInit {
    categories: BaseDataCategory[] | undefined;

    selectedCategory: BaseDataCategory | undefined;
    inputLabel: string = '';

    baseDataItems: BaseDataItem[] = [];

    ngOnInit() {
        this.categories = [
            { id: 1, key: 'a', value: 'دفتر مشاوره' },
            { id: 2, key: 'b', value: 'نتایج کمیسیون ها' },
            { id: 3, key: 'c', value: 'محل خدمت' },
            { id: 4, key: 'd', value: 'وضعیت سلامت' },
            { id: 4, key: 'e', value: 'انواع عضویت' },
            { id: 4, key: 'f', value: 'مراکز آموزشی' },
            { id: 4, key: 'g', value: 'کتاب های آموزشی' },
            { id: 4, key: 'h', value: 'بنر' },
            { id: 4, key: 'i', value: 'پمفلت' },
            { id: 4, key: 'j', value: 'فیلم' },
            { id: 4, key: 'k', value: 'بروشور' },
        ];

        this.baseDataItems = [
            {
                id: 1,
                title: 'test a-1',
                categoryId: 1,
            },
            {
                id: 2,
                title: 'test a-2',
                categoryId: 1,
            },
            {
                id: 3,
                title: 'test b-1',
                categoryId: 2,
            },
            {
                id: 4,
                title: 'test c-1',
                categoryId: 3,
            },
            {
                id: 5,
                title: 'test d-1',
                categoryId: 4,
            },
            {
                id: 6,
                title: 'test d-2',
                categoryId: 4,
            },
        ];
    }

    protected readonly items = items;
}
