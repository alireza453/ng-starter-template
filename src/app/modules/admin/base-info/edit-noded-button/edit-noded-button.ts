import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Popover } from 'primeng/popover';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { BaseInfoService } from '../base-info.service';

@Component({
    selector: 'edit-node-button',
    imports: [Button, FormsModule, InputText, Popover, Toast, Tooltip],
    templateUrl: './edit-noded-button.html',
})
export class EditNodedButton implements OnInit {
    @Input() node?: TreeNode;
    @Output() childEditedEvent = new EventEmitter();
    @Output() childDeletedEvent = new EventEmitter();

    name!: string;
    display!: string;
    categoryId!: string;

    constructor(private _baseInfoService: BaseInfoService) {}

    ngOnInit(): void {
        this.name = this.node.data.name;
        this.display = this.node.label;
    }

    editChild() {
        if (!this.name || !this.display) {
            return;
        }
        this._baseInfoService
            .editBaseInfo({
                categoryId: this.categoryId,
                name: this.name,
                display: this.display,
                value: this.name,
            })
            .subscribe({
                complete: () => {
                    this.childEditedEvent.emit();
                },
            });
    }


    deleteChild(){
        if (this.node.type=='parent'){
            this._baseInfoService.deleteBaseInfoCategory(this.node.key).subscribe((d=>{
                this.childDeletedEvent.emit();
            }));
        }else{
            this._baseInfoService.deleteBaseInfo(this.node.key).subscribe((d=>{
                this.childDeletedEvent.emit();
            })) ;
        }

    }
}
