import { Component, OnInit } from "@angular/core";
import { IHighestDebt } from "../../interfaces/highest-debt.interface";
import { BackendService } from "../../backend.service";
import { takeUntil } from "rxjs/operators";
import { FeedbackService } from "../../services/feedback.service";
import { Subject } from "rxjs";

@Component({
	selector: "app-highest-credit",
	templateUrl: "./highest-credit.component.html",
	styleUrls: ["./highest-credit.component.scss"]
})
export class HighestCreditComponent implements OnInit {
	destroy$ = new Subject<boolean>();
	highestCredit$ = new Subject<IHighestDebt[]>();

	//User details
	selectedUserId: string;
	infoDialog: boolean;

	constructor(
		private backendService: BackendService,
		private feedbackService: FeedbackService
	) {}

	ngOnInit(): void {
		this.getHighestCredit();
	}

	getHighestCredit(): void {
		this.feedbackService.spinner$.next(true);
		this.backendService
			.getHighestCredit()
			.pipe(takeUntil(this.destroy$))
			.subscribe((events: IHighestDebt[]) => {
				this.highestCredit$.next(events);
				this.feedbackService.spinner(false);
			});
	}

	showInfo(userId: string) {
		this.selectedUserId = userId;
		this.infoDialog = true;
	}
}
