import { Component, OnInit } from '@angular/core';
import { IHighestDebt } from '../../interfaces/highest-debt.interface';
import { BackendService } from '../../backend.service';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'app-highest-debt',
    templateUrl: './highest-debt.component.html',
    styleUrls: ['./highest-debt.component.scss'],
})
export class HighestDebtComponent implements OnInit {
    skeletonLoader = new Array(5).fill(null);
    destroy$ = new Subject<boolean>();
    highestDebt$ = new BehaviorSubject<IHighestDebt[] | null>(null);

    //User details
    selectedUserId: string;
    infoDialog: boolean;

    constructor(private backendService: BackendService) {}

    ngOnInit(): void {
        this.getHighestDebt();
    }

    getHighestDebt(): void {
        this.highestDebt$.next(this.skeletonLoader);
        this.backendService
            .getHighestDebt()
            .pipe(takeUntil(this.destroy$))
            .subscribe((events: IHighestDebt[]) => {
                this.highestDebt$.next(events);
            });
    }

    showInfo(userId: string) {
        this.selectedUserId = userId;
        this.infoDialog = true;
    }
}
