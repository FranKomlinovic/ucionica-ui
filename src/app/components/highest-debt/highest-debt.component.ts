import { Component, OnInit } from "@angular/core";
import { IHighestDebt } from "../../interfaces/highest-debt.interface";
import { BackendService } from "../../backend.service";
import { takeUntil } from "rxjs/operators";
import { FeedbackService } from "../../services/feedback.service";
import { Subject } from "rxjs";

@Component({
	selector: "app-highest-debt",
	templateUrl: "./highest-debt.component.html",
	styleUrls: ["./highest-debt.component.scss"]
})
export class HighestDebtComponent implements OnInit {
	destroy$ = new Subject<boolean>();
	highestDebt$ = new Subject<IHighestDebt[]>();

	//User details
	selectedUserId: string;
	infoDialog: boolean;

	constructor(
		private backendService: BackendService,
		private feedbackService: FeedbackService
	) {}

	ngOnInit(): void {
		this.getHighestDebt();
	}

	getHighestDebt(): void {
		this.feedbackService.spinner$.next(true);
		this.backendService
			.getHighestDebt()
			.pipe(takeUntil(this.destroy$))
			.subscribe((events: IHighestDebt[]) => {
				this.highestDebt$.next(events);
				this.feedbackService.spinner(false);
			});
	}

	showInfo(userId: string) {
		this.selectedUserId = userId;
		this.infoDialog = true;
	}
}
