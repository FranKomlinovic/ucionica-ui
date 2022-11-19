import { Component, OnInit } from '@angular/core';
import { IHighestDebt } from '../../interfaces/highest-debt.interface';
import { BackendService } from '../../backend.service';

@Component({
    selector: 'app-highest-debt',
    templateUrl: './highest-debt.component.html',
    styleUrls: ['./highest-debt.component.scss'],
})
export class HighestDebtComponent implements OnInit {
    highestDebt: IHighestDebt[] = [];
    spinnerOn: boolean = false;

    constructor(private backendService: BackendService) {}

    ngOnInit(): void {
        this.getHighestDebt();
    }

    getHighestDebt() {
        this.spinnerOn = true;
        this.backendService.getHighestDebt().subscribe((data) => {
            this.highestDebt = data;
            this.spinnerOn = false;
        });
    }
}
