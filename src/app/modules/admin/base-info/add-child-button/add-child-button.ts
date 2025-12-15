import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { InputGroup } from 'primeng/inputgroup';
import { Popover } from 'primeng/popover';
import { InputText } from 'primeng/inputtext';
import { BaseInfoService } from '../base-info.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'add-child-button',
    imports: [
        Button,
        Tooltip,
        Toast,
        InputGroup,
        Popover,
        InputText,
        ButtonDirective,
        FormsModule,
    ],
    templateUrl: './add-child-button.html',

})
export class AddChildButton {
    @Input() node?: TreeNode;
    @Output() childAddedEvent = new EventEmitter();

    name: string = '';
    display: string = '';
    constructor(
        private _baseInfoService: BaseInfoService
    ) {}

    addChild() {
        if (!this.name || !this.display) {
            return;
        }
        this._baseInfoService.addBaseInfo({categoryId:this.node.key,name:this.name,display:this.display,value:this.name}).subscribe({
            complete:()=>{
                this.childAddedEvent.emit();
            }
        });
    }

}
