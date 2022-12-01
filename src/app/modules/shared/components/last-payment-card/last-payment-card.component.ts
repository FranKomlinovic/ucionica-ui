import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IPayment } from "src/app/interfaces/payments.interface";

@Component({
	selector: "app-last-payment-card",
	templateUrl: "./last-payment-card.component.html",
	styleUrls: ["./last-payment-card.component.scss"]
})
export class LastPaymentCardComponent implements OnInit {
	@Input() payment: IPayment | null;

	@Output() deleteClicked = new EventEmitter<string>();
	@Output() editClicked = new EventEmitter<string>();

	constructor() {}

	ngOnInit(): void {}

	delete(paymentId: string) {
		this.deleteClicked.emit(paymentId);
	}

	edit(paymentId: string) {
		this.editClicked.emit(paymentId);
	}
}
