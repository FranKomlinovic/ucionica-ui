import { Component, OnInit } from "@angular/core";
import { IHighestDebt } from "../../interfaces/highest-debt.interface";
import { BackendService } from "../../backend.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FeedbackService } from "../../services/feedback.service";

@Component({
	selector: "app-highest-credit",
	templateUrl: "./highest-credit.component.html",
	styleUrls: ["./highest-credit.component.scss"]
})
export class HighestCreditComponent implements OnInit {
	showDialog: boolean = false;
	selectedUserId: string;

	highestCredit: IHighestDebt[] = [];
	highestCredits$ = new Subject<IHighestDebt[]>();
	destroy$ = new Subject<boolean>();

	constructor(
		private backendService: BackendService,
		private feedbackService: FeedbackService
	) {}

	ngOnInit(): void {
		this.getHighestDebt();
	}

	getDetails(userId: string) {
		this.selectedUserId = userId;
		this.showDialog = true;
	}

	getHighestDebt() {
		this.feedbackService.spinner$.next(true);
		this.backendService
			.getHighestCredit()
			.pipe(takeUntil(this.destroy$))
			.subscribe((highestCredit: IHighestDebt[]) => {
				console.log(highestCredit);
				this.highestCredits$.next(highestCredit);
				this.feedbackService.spinner(false);
			});
	}
}
