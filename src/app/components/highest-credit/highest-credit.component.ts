import { Component, OnInit } from '@angular/core';
import { IHighestDebt } from '../../interfaces/highest-debt.interface';
import { BackendService } from '../../backend.service';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'app-highest-credit',
    templateUrl: './highest-credit.component.html',
    styleUrls: ['./highest-credit.component.scss'],
})
export class HighestCreditComponent implements OnInit {
    skeletonLoader = new Array(5).fill(null);
    destroy$ = new Subject<boolean>();
    highestCredit$ = new BehaviorSubject<IHighestDebt[] | null>(null);

    //User details
    selectedUserId: string;
    infoDialog: boolean;

    constructor(private backendService: BackendService) {}

    ngOnInit(): void {
        this.getHighestCredit();
    }

    getHighestCredit(): void {
        this.highestCredit$.next(this.skeletonLoader);
        this.backendService
            .getHighestCredit()
            .pipe(takeUntil(this.destroy$))
            .subscribe((events: IHighestDebt[]) => {
                this.highestCredit$.next(events);
            });
    }

    showInfo(userId: string) {
        this.selectedUserId = userId;
        this.infoDialog = true;
    }
}
