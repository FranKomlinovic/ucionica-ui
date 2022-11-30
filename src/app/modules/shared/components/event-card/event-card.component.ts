import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IEvent } from "src/app/interfaces/event.interface";

@Component({
	selector: "app-event-card",
	templateUrl: "./event-card.component.html",
	styleUrls: ["./event-card.component.scss"]
})
export class EventCardComponent {
	@Input() event: IEvent | null;

	@Output() deleteClicked = new EventEmitter<string>();
	@Output() editClicked = new EventEmitter<string>();

	delete(id: string) {
		this.deleteClicked.emit(id);
	}

	edit(id: string) {
		this.editClicked.emit(id);
	}
}
