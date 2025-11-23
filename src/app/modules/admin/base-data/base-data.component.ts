import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeTemplate, TreeNode } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Tree } from 'primeng/tree';
import { JsonPipe } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';

@Component({
    selector: 'base-data',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        Tree,
        PrimeTemplate,
        Button,
        Dialog,
        FormsModule,
        Tooltip,
    ],
    templateUrl: './base-data.component.html',
    styleUrl: './base-data.component.scss',
})
export class BaseDataComponent implements OnInit {
    basedata!: TreeNode[];


    visibleInsertDialog: boolean = false;
    visibleDetailsDialog: boolean = false;
    newTitle: string;
    editingTitle: string = '';

    /**
     * node can be either parent or child
     */
    selectedNode: TreeNode | undefined;

    constructor() {}

    ngOnInit() {
        this.basedata = [
            {
                key: '0',
                label: 'نتایج کمیسیون ها',
                data: 'Documents Folder',
                type: 'parent',
                children: [
                    {
                        key: '0-0',
                        data: 'Work Folder',
                        label: 'نتیجه اول',
                        type: 'child',
                    },
                    {
                        key: '0-1',
                        label: 'نتیجه دوم',
                        data: 'Home Folder',
                        type: 'child',
                    },
                ],
            },
            {
                key: '1',
                label: 'مراکز آموزشی',
                data: 'Documents Folder',
                type: 'parent',
                children: [
                    {
                        key: '1-0',
                        data: 'Work Folder',
                        label: 'مرکز اول',
                        type: 'child',
                    },
                    {
                        key: '1-1',
                        label: 'مرکز دوم',
                        data: 'Home Folder',
                        type: 'child',
                    },
                ],
            },
        ];
    }




    /**
     * Details Functions
     */
    showDetailsDialog(node: TreeNode) {
        this.visibleDetailsDialog = true;
        this.selectedNode = node;
        this.editingTitle = node.label;
    }

    ApplyUpdate() {
        this.visibleDetailsDialog = false;
    }
    ApplyDelete() {
        this.visibleDetailsDialog = false;
    }

    /**
     * Insert Functions
     */
    showInsertDialog(node: TreeNode) {
        this.visibleInsertDialog = true;
        this.selectedNode = node;

    }

    ApplyInsert() {
        this.visibleInsertDialog = false;
    }
}
