import { Component, OnInit } from "@angular/core";
import { Auth } from "aws-amplify";
import { MessageService } from "primeng/api";
import { FeedbackService } from "../../services/feedback.service";

@Component({
	selector: "app-user-create",
	templateUrl: "./user-create.component.html",
	styleUrls: ["./user-create.component.scss"],
	providers: [MessageService]
})
export class UserCreateComponent implements OnInit {
	email: string;
	givenName: string;
	familyName: string;
	password: string;
	passwordValidation: string;

	constructor(private feedbackService: FeedbackService) {}

	ngOnInit(): void {}

	isValid(): boolean {
		return !(
			this.password === this.passwordValidation &&
			this.password != null &&
			this.email != null &&
			this.familyName != null &&
			this.givenName != null &&
			this.password.length > 5
		);
	}

	public signUp() {
		this.feedbackService.spinner$.next(true);
		Auth.signUp({
			username: this.email,
			password: this.password,
			attributes: {
				given_name: this.givenName,
				family_name: this.familyName
			}
		})
			.then(res => {
				this.feedbackService.successToast(
					this.givenName + " " + this.familyName + " kreiran"
				);
				this.email = "";
				this.givenName = "";
				this.familyName = "";
				this.password = "";
				this.passwordValidation = "";
			})
			.catch(reason => {
				this.feedbackService.errorToast(reason.message);
			})
			.finally(() => {
				this.feedbackService.spinner(false);
			});
	}
}
