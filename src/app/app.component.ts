import { Component } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { FeedbackService } from "./services/feedback.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	title = "ucionica";

	constructor(
		private primeConfig: PrimeNGConfig,
		protected feedbackService: FeedbackService
	) {
		this.primeConfig.ripple = true;
	}
}
