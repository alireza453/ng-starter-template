import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { Tree } from 'primeng/tree';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-home-component',
    imports: [Tree, Button, TableModule],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    ngOnInit(): void {

    }
}
