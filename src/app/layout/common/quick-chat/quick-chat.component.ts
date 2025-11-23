import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DOCUMENT, DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
    Component,
    ElementRef,
    Inject,
    NgZone,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FuseScrollbarDirective } from '@fuse/directives/scrollbar';
import { TranslocoPipe } from '@ngneat/transloco';
import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { Chat } from 'app/layout/common/quick-chat/quick-chat.types';
import { Avatar } from 'primeng/avatar';
import { Badge, BadgeDirective } from 'primeng/badge';
import { Button } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { InputText } from 'primeng/inputtext';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'quick-chat',
    templateUrl: './quick-chat.component.html',
    styleUrls: ['./quick-chat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'quickChat',
    standalone: true,
    imports: [
        NgClass,
        FuseScrollbarDirective,
        TextFieldModule,
        DatePipe,
        Button,
        TranslocoPipe,
        DrawerModule,
        Avatar,
        InputText,
        FormsModule
    ],
})
export class QuickChatComponent implements OnInit, OnDestroy {
    @ViewChild('drawerRef') drawerRef!: Drawer;
    @ViewChild('messageInput') messageInput: ElementRef;
    chat: Chat;
    chats: Chat[];
    opened: boolean = false;
    selectedChat: Chat;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    htmlTag: HTMLElement = document.documentElement;

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _quickChatService: QuickChatService,
        private _scrollStrategyOptions: ScrollStrategyOptions
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        // Chat
        this._quickChatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat: Chat) => {
                this.chat = chat;
            });

        // Chats
        this._quickChatService.chats$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chats: Chat[]) => {
                this.chats = chats;
            });

        // Selected chat
        this._quickChatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat: Chat) => {
                this.selectedChat = chat;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Select the chat
     *
     * @param id
     */
    selectChat(id: string): void {
        // Get the chat data
        this._quickChatService.getChatById(id).subscribe();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    protected readonly document = document;
    closeCallback(e): void {
        this.drawerRef.close(e);
    }
}
