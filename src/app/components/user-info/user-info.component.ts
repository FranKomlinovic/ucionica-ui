import { Component, Input, OnInit } from "@angular/core";
import { BackendService } from "../../backend.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { IUserDetails } from "../../interfaces/user-details.interface";
import { IEvent } from "../../interfaces/event.interface";
import { takeUntil } from "rxjs/operators";
import { FeedbackService } from "../../services/feedback.service";
import { Subject } from "rxjs";

@Component({
	selector: "app-user-info",
	templateUrl: "./user-info.component.html",
	styleUrls: ["./user-info.component.scss"],
	providers: [MessageService]
})
export class UserInfoComponent implements OnInit {
	@Input() userId: string;
	@Input() showButton: boolean;

	userEvents$ = new Subject<IEvent[]>();
	userDetails: IUserDetails;
	userDetails$ = new Subject<IUserDetails>();
	destroy$ = new Subject<boolean>();

	constructor(
		private backendService: BackendService,
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private feedbackService: FeedbackService
	) {}

	ngOnInit() {
		this.loadUserDetails();
		this.loadUserEvents();
	}

	generateName(event: IEvent): string {
		if (event.currentEvent) {
			return "[UPRAVO] " + event.name;
		}
		return event.name;
	}

	loadUserEvents(): void {
		this.feedbackService.spinner$.next(true);
		this.backendService
			.getEventsByUserId(this.userId)
			.pipe(takeUntil(this.destroy$))
			.subscribe((events: IEvent[]) => {
				this.userEvents$.next(events);
				this.feedbackService.spinner(false);
			});
	}

	loadUserDetails(): void {
		this.feedbackService.spinner$.next(true);
		this.backendService
			.getUserDetails(this.userId)
			.pipe(takeUntil(this.destroy$))
			.subscribe((details: IUserDetails) => {
				this.userDetails = details;
				this.userDetails$.next(details);
				this.feedbackService.spinner(false);
			});
	}

	evidentStay(userId: string) {
		this.feedbackService.spinner$.next(true);
		this.backendService.postStay(userId, new Date()).subscribe(response => {
			this.showSuccess(response.message);
			this.loadUserDetails();
			this.confirmationService.close();
		});
	}

	showSuccess(message: string) {
		this.messageService.add({
			severity: "success",
			summary: "Success",
			detail: message
		});
	}

	confirmStay() {
		let message = "Želite li se prijaviti u učionicu?";
		if (this.userDetails.currentlyActive) {
			message = "Želite li se odjaviti iz učionice?";
		}

		this.confirmationService.confirm({
			message: message,
			icon: "pi pi-exclamation-triangle",
			accept: () => {
				this.evidentStay(this.userDetails.id);
			},
			reject: () => {
				this.confirmationService.close();
			}
		});
	}
}
