export interface IEvent {
	id: string;
	name: string;
	description: string;
	users: string[];
	date: string;
	startTime: string;
	endTime: Date;
	picture: Date;
	currentEvent: boolean;
}
