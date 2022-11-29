export class CreatePaymentModel {
	id?: string | null;
	userId: string;
	description?: string | null;
	amount: number;
	time?: Date | null;

	constructor(
		id: string,
		userId: string,
		amount: number,
		description: string,
		time: Date
	) {
		this.id = id;
		this.userId = userId;
		this.amount = amount;
		this.description = description;
		this.time = new Date(time.getTime() - time.getTimezoneOffset() * 60000);
	}
}
