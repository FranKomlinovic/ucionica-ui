export class CreateEventModel {
	id?: string | null;
	name: string;
	description?: string | null;
	users?: string[] | null;
	startTime?: Date | null;
	endTime?: Date | null;
	picture?: string | null;

	constructor(
		id: string,
		name: string,
		description: string,
		users: string[],
		startTime: Date,
		endTime: Date,
		picture: string
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.users = users || null;
		this.startTime = new Date(
			startTime.getTime() - startTime.getTimezoneOffset() * 60000
		);
		this.endTime = new Date(
			endTime.getTime() - endTime.getTimezoneOffset() * 60000
		);
		this.picture = picture;
	}
}
