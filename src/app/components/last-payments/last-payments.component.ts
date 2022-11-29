import { Component, OnInit } from "@angular/core";
import { IPayment } from "../../interfaces/payments.interface";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { IUser } from "../../interfaces/user.interface";
import { BackendService } from "../../backend.service";
import { BehaviorSubject, Subject } from "rxjs";
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { map, takeUntil } from "rxjs/operators";
import { FeedbackService } from "../../services/feedback.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-last-payments",
	templateUrl: "./last-payments.component.html",
	styleUrls: ["./last-payments.component.scss"],
	providers: [MessageService]
})
export class LastPaymentsComponent implements OnInit {
	users: IUser[] = [];

	allPayments$ = new Subject<IPayment[]>();
	users$ = new BehaviorSubject<IUser[]>(this.users);
	destroy$ = new Subject<boolean>();

	formGroup = new FormGroup({
		id: new FormControl<string>(""),
		userId: new FormControl<string>("", {
			nonNullable: true,
			validators: Validators.required
		}),
		time: new FormControl<Date | null>(null, {
			validators: Validators.required
		}),
		description: new FormControl<string>(""),
		amount: new FormControl<number>(100, {
			nonNullable: true,
			validators: Validators.required
		})
	});

	//Display controls
	displayDialog: boolean = false;

	constructor(
		private backendService: BackendService,
		private confirmationService: ConfirmationService,
		private feedbackService: FeedbackService
	) {}

	ngOnInit(): void {
		this.loadPayments();
		this.loadUsers();
	}

	filterUsers(event: { ogEvent: PointerEvent; query: string }) {
		this.users = this.users$.value.filter((user: IUser) =>
			user.username.toLowerCase().includes(event.query.toLocaleLowerCase())
		);
	}

	selectUser(user: IUser) {
		this.formGroup
			.get("userId")
			?.setValue(user.id, { emitModelToViewChange: false });
	}

	loadPayments(): void {
		this.feedbackService.spinner$.next(true);
		this.backendService
			.getAllPayments()
			.pipe(takeUntil(this.destroy$))
			.subscribe((payments: IPayment[]) => {
				this.allPayments$.next(payments);
				this.feedbackService.spinner(false);
			});
	}

	loadUsers() {
		this.backendService
			.getUsers()
			.pipe(takeUntil(this.destroy$))
			.subscribe((users: IUser[]) => {
				this.users = users;
				this.users$.next(users);
			});
	}

	deleteClick(id: string) {
		this.confirmationService.confirm({
			message: "Jeste li sigurni da želite obrisati uplatu?",
			accept: () => {
				this.deletePayment(id);
			}
		});
	}

	deletePayment(id: string) {
		this.feedbackService.spinner(true);
		this.backendService.deletePayment(id).subscribe({
			next: a => {
				this.loadPayments();
				this.feedbackService.successToast(a.message);
			},
			error: e => {
				this.feedbackService.errorToast(e.message);
			}
		});
	}

	createPayment() {
		const paymentData = this.formGroup.getRawValue();

		this.feedbackService.spinner(true);
		this.backendService.createPayment(paymentData).subscribe({
			next: a => {
				this.feedbackService.successToast(a.message);
				this.loadPayments();
				this.displayDialog = false;
			},
			error: (err: HttpErrorResponse) => {
				this.displayDialog = false;
				this.feedbackService.errorToast(err.message);
			}
		});
	}

	editPayment(paymentId: string) {
		this.openDialog();
		this.feedbackService.spinner(true);
		this.backendService
			.getPaymentById(paymentId)
			.pipe(
				map(res => ({
					...res,
					time: new Date(res.time!)
				}))
			)
			.subscribe(value => {
				this.formGroup.patchValue(value);
				this.feedbackService.spinner(false);
			});
	}

	openDialog() {
		this.displayDialog = true;
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
