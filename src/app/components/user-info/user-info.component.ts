import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { BackendService } from "../../backend.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { IUserDetails } from "../../interfaces/user-details.interface";
import { IEvent } from "../../interfaces/event.interface";
import { takeUntil } from "rxjs/operators";
import { FeedbackService } from "../../services/feedback.service";
import { BehaviorSubject, Subject } from "rxjs";
import { Auth, Storage } from "aws-amplify";
import { FileUpload } from "primeng/fileupload";

@Component({
	selector: "app-user-info",
	templateUrl: "./user-info.component.html",
	styleUrls: ["./user-info.component.scss"],
	providers: [MessageService]
})
export class UserInfoComponent implements OnInit {
	@Input() userId: string;
	@Input() readOnly: boolean;
	@ViewChild(FileUpload) fileUpload: FileUpload;

	userEvents$ = new Subject<IEvent[]>();
	userDetails$ = new BehaviorSubject<IUserDetails>({} as IUserDetails);
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
				this.userDetails$.next(details);
				this.feedbackService.spinner(false);
			});
	}

	evidentStay(userId: string) {
		this.feedbackService.spinner$.next(true);
		this.backendService.postStay(userId, new Date()).subscribe(response => {
			this.feedbackService.successToast(response.message);
			this.loadUserDetails();
			this.confirmationService.close();
		});
	}

	confirmStay() {
		const isUserActive = this.userDetails$.value.currentlyActive;

		this.confirmationService.confirm({
			message: isUserActive
				? "Želite li se odjaviti iz učionice?"
				: "Želite li se prijaviti u učionicu?",
			icon: "pi pi-exclamation-triangle",
			accept: () => {
				this.evidentStay(this.userDetails$.value.id);
			},
			reject: () => {
				this.confirmationService.close();
			}
		});
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	upload($event: any) {
		this.feedbackService.spinner$.next(true);

		Auth.currentAuthenticatedUser().then(a => {
			let file = $event.files[0];
			Storage.put(file.name, file).then(result => {
				Auth.updateUserAttributes(a, {
					picture:
						"https://ucionica-pictures.s3.eu-central-1.amazonaws.com/public/" +
						result.key
				}).then(() => {
					this.feedbackService.spinner(false);
					this.fileUpload.clear();
					this.loadUserDetails();
				});
			});
		});
	}
}
