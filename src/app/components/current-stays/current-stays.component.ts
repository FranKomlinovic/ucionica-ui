import { Component, OnInit } from "@angular/core";
import { ICurrentStay } from "../../interfaces/current-stay.interface";
import { ConfirmationService, MessageService } from "primeng/api";
import { IUser } from "../../interfaces/user.interface";
import { BackendService } from "../../backend.service";
import { Auth } from "aws-amplify";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FeedbackService } from "../../services/feedback.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-current-stays",
	templateUrl: "./current-stays.component.html",
	styleUrls: ["./current-stays.component.scss"],
	providers: [MessageService]
})
export class CurrentStaysComponent implements OnInit {
	users$ = new Subject<IUser[]>();
	destroy$ = new Subject<boolean>();
	allStays$ = new Subject<ICurrentStay[]>();

	//Display controls
	displayDialog: boolean = false;
	spinnerOn: boolean = false;
	admin: boolean = false;
	//Form controls
	selectedUserAdvanced: IUser[];
	date: Date = new Date();
	//Grid controls
	numberOfStays: number = 0;
	//User details
	selectedUserId: string;
	infoDialog: boolean;

	constructor(
		private backendService: BackendService,
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private feedbackService: FeedbackService
	) {}

	ngOnInit(): void {
		this.loadUsers();
		this.loadCurrentStays();
		this.checkIfAdmin();
	}

	checkIfAdmin() {
		Auth.currentAuthenticatedUser().then(data => {
			let groups = data.signInUserSession.accessToken.payload["cognito:groups"];
			if (groups === undefined) {
				this.admin = false;
				return;
			}
			if (groups.includes("Generali")) {
				this.admin = true;
			}
		});
	}

	loadUsers() {
		this.backendService
			.getUsers()
			.pipe(takeUntil(this.destroy$))
			.subscribe((users: IUser[]) => {
				this.users$.next(users);
			});
	}

	loadCurrentStays(): void {
		this.feedbackService.spinner$.next(true);
		this.backendService
			.getAllStays()
			.pipe(takeUntil(this.destroy$))
			.subscribe((events: ICurrentStay[]) => {
				this.allStays$.next(events);
				this.numberOfStays = events.length;
				this.feedbackService.spinner(false);
			});
	}

	evidentStay(userId: string, date: Date) {
		this.feedbackService.spinner$.next(true);
		this.backendService.postStay(userId, date).subscribe({
			next: a => {
				this.feedbackService.successToast(a.message);
				this.loadCurrentStays();
				this.displayDialog = false;
			},
			error: (err: HttpErrorResponse) => {
				this.displayDialog = false;
				this.feedbackService.errorToast(err.message);
			}
		});
	}

	endAllStays() {
		this.feedbackService.spinner$.next(true);
		this.backendService.endAllStays().subscribe(response => {
			this.feedbackService.successToast(response.message);
			this.loadCurrentStays();
		});
	}

	openDialog() {
		this.displayDialog = true;
		this.date = new Date();
	}

	saveStay() {
		this.feedbackService.spinner$.next(true);
		if (this.selectedUserAdvanced === undefined) {
			return;
		}
		for (const userModel of this.selectedUserAdvanced) {
			this.evidentStay(userModel.id, this.date);
		}
	}

	confirmEndStay(id: string) {
		this.confirmationService.confirm({
			message: "Jeste li sigurni da želite završiti dejstvo za ovog korisnika?",
			icon: "pi pi-exclamation-triangle",
			accept: () => {
				this.evidentStay(id, new Date());
				this.confirmationService.close();
				this.loadCurrentStays();
			},
			reject: () => {
				this.confirmationService.close();
			}
		});
	}

	confirmEndAllStays() {
		this.confirmationService.confirm({
			message: "Jeste li sigurni da želite završiti dejstvo za sve korisnike?",
			icon: "pi pi-exclamation-triangle",
			accept: () => {
				this.endAllStays();
				this.confirmationService.close();
			},
			reject: () => {
				this.confirmationService.close();
			}
		});
	}

	showInfo(userId: string) {
		this.selectedUserId = userId;
		this.infoDialog = true;
	}
}
