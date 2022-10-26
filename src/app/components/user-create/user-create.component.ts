import {Component, OnInit} from '@angular/core';
import {Auth} from 'aws-amplify';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  email: string;
  givenName: string;
  familyName: string;
  password: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  public signUp(): Promise<any> {
    return Auth.signUp({
      username: this.email,
      password: this.password,
      attributes: {
        given_name: this.givenName,
        family_name: this.familyName,
      }
    }).then(res => console.log(res));
  }
}
