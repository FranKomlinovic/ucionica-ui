import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IUserDetails } from "src/app/interfaces/user-details.interface";

@Component({
	selector: "app-user-card",
	templateUrl: "./user-card.component.html",
	styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent implements OnInit {
	@Input() readOnly: boolean;
	@Input() userDetails: IUserDetails | null;

	@Output() evidentStay = new EventEmitter<string>();
	@Output() uploadClicked = new EventEmitter<string>();

	constructor() {}

	ngOnInit(): void {}

	logStay() {
		this.evidentStay.emit();
	}

	uploadClick(event: any) {
		this.uploadClicked.emit(event);
	}
}
