import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ucionica';

    constructor(private primeeConfig: PrimeNGConfig) {
        this.primeeConfig.ripple = true;
    }
}
