export class CreateStayModel {
	userId: string;
	time: string;

	constructor(userId: string, time: Date) {
		this.userId = userId;
		this.time = new Date(
			time.getTime() - time.getTimezoneOffset() * 60000
		).toISOString();
	}
}
