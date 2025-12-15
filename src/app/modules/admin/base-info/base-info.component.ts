import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService, PrimeTemplate, TreeNode } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputGroup } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { Tree } from 'primeng/tree';
import { AddChildButton } from './add-child-button/add-child-button';
import { BaseInfoService } from './base-info.service';
import { Toast } from 'primeng/toast';
import { EditNodedButton } from './edit-noded-button/edit-noded-button';

@Component({
    selector: 'base-info',
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        Tree,
        Button,
        Dialog,
        FormsModule,
        InputGroup,
        Tooltip,
        PrimeTemplate,
        AddChildButton,
        Toast,
        EditNodedButton,
    ],
    templateUrl: './base-info.component.html',
    styleUrl: './base-info.component.scss',
    providers: [MessageService],
})
export class BaseDataComponent implements OnInit {
    constructor(
        private _baseInfoService: BaseInfoService,
        private _messageService: MessageService
    ) {}

    baseInfoCategories!: TreeNode[];
    selectedNode!: TreeNode;

    name: string = '';
    display: string = '';

    ngOnInit() {
        this.getAllData();
    }

    onNodeSelect($event) {
        this.selectedNode = $event.node;
    }

    addCategory() {
        if (this.name == '' || this.display == '') {
            return;
        }
        this._baseInfoService
            .addCategory({ name: this.name, display: this.display })
            .subscribe({
                next: () => {
                    this.getAllData();
                    this.name = '';
                    this.display = '';
                },
            });
    }

    getAllData() {
        this._baseInfoService.getBaseInfoData().subscribe((result) => {
            this.baseInfoCategories = result;
            console.log(result);
        });
    }

    onChildAdded() {
        this._messageService.add({
            severity: 'info',
            summary: 'پیام',
            detail: 'زیرمجوعه اضافه شد',
        });
        this.getAllData();
    }

    onChildEdited() {
        this._messageService.add({
            severity: 'info',
            summary: 'پیام',
            detail: ' ویرایش شد',
        });
        this.getAllData();
    }

    onChildDeleted() {
        this._messageService.add({
            severity: 'info',
            summary: 'پیام',
            detail: ' حذف شد',
        });
        this.getAllData();
    }
}
