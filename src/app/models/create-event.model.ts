export class CreateEventModel {
  name: string;
  description: string;
  users: string[];
  startTime: string;
  endTime: string;
  picture: string;

  constructor(name: string, description: string, users: string[], startTime: Date, endTime: Date, picture: string) {
    this.name = name;
    this.description = description;
    this.users = users;
    this.startTime = new Date(startTime.getTime() - (startTime.getTimezoneOffset() * 60000)).toISOString();
    this.endTime = new Date(endTime.getTime() - (endTime.getTimezoneOffset() * 60000)).toISOString();
    this.picture = picture;
  }

}
