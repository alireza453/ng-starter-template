import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import {
    FuseNavigationService,
} from '@fuse/components/navigation';
import { AvailableLangs, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ButtonModule } from 'primeng/button';
import { Select, SelectChangeEvent } from 'primeng/select';
import { FuseConfigService } from '../../../../@fuse/services/config';

@Component({
    selector: 'languages',
    templateUrl: './languages.component.html',
    styleUrl: './languages.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'languages',
    standalone: true,
    imports: [
        FormsModule,
        ButtonModule,
        Select,
        TranslocoPipe,
    ],
})
export class LanguagesComponent implements OnInit, OnDestroy {
    availableLangs: AvailableLangs;
    activeLang: string;

    htmlTag: HTMLElement = document.documentElement;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _translocoService: TranslocoService,
        private _fuseConfigService: FuseConfigService,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();

        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.activeLang = activeLang;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     */
    setActiveLang(event: SelectChangeEvent): void {
        // Clear the 'layout' query param to allow layout changes
        const lang: string = event.value.id;
        this._router
            .navigate([], {
                queryParams: {
                    layout: null,
                },
                queryParamsHandling: 'merge',
            })
            .then(() => {
                // Set the active lang
                this._translocoService.setActiveLang(lang);
                // Set the config
                if (lang == 'en') {
                    this.htmlTag.setAttribute('dir', 'ltr');
                    this._fuseConfigService.config = { layoutDirection: 'ltr' };
                } else {
                    this.htmlTag.setAttribute('dir', 'rtl');

                    this._fuseConfigService.config = { layoutDirection: 'rtl' };
                }
            });
    }
}
