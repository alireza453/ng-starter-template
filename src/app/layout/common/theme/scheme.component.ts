import { Component, OnInit, signal } from '@angular/core';

import {} from 'app/app.config';
import { Subject, takeUntil } from 'rxjs';
import {
    FuseConfig,
    FuseConfigService,
} from '../../../../@fuse/services/config';
import { Button } from 'primeng/button';

@Component({
    selector: 'scheme',
    standalone: true,
    imports: [ Button],
    templateUrl: './scheme.component.html',
    styleUrl: './scheme.component.scss',
})
export class SchemeComponent implements OnInit {
    private _config: FuseConfig;
    currentScheme = signal<string>('mylight');
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _fuseConfigService: FuseConfigService) {}

    ngOnInit(): void {
        this._fuseConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: FuseConfig) => {
                // Store the config
                this._config = config;
            });
    }

    /**
     * Set the scheme on the config
     *
     * @param scheme
     */
    setScheme(): void {
        if (this._config.scheme != 'mylight') {
            //dark | auto
            this.currentScheme.set('mylight');
            this._fuseConfigService.config = { scheme: 'mylight' };
        } else {
            this.currentScheme.set('mydark');
            this._fuseConfigService.config = { scheme: 'mydark' };
        }
    }
}
