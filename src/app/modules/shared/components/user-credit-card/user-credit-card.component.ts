import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IHighestDebt } from "src/app/interfaces/highest-debt.interface";

@Component({
	selector: "app-user-credit-card",
	templateUrl: "./user-credit-card.component.html",
	styleUrls: ["./user-credit-card.component.scss"]
})
export class UserCreditCardComponent {
	@Input() credit: IHighestDebt | null;

	@Output() showInfoClicked = new EventEmitter<string>();

	showInfo(userId: string) {
		this.showInfoClicked.emit(userId);
	}
}
