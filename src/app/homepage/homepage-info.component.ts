import { Component, OnInit } from "@angular/core";
import { Auth } from "aws-amplify";
import { MessageService } from "primeng/api";

@Component({
	selector: "app-homepage",
	templateUrl: "./homepage-component.html",
	styleUrls: ["./homepage-info.component.scss"],
	providers: [MessageService]
})
export class HomepageInfoComponent implements OnInit {
	spinnerOn: boolean;
	userId: string;

	constructor() {}

	ngOnInit() {
		this.getAuthenticatedUser();
	}

	getAuthenticatedUser() {
		this.spinnerOn = true;
		Auth.currentAuthenticatedUser().then(data => {
			this.userId = data.username;
			this.spinnerOn = data.username !== null;
		});
	}
}
