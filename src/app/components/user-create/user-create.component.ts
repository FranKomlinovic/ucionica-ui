import {Component, OnInit} from '@angular/core';
import {Auth} from 'aws-amplify';
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [MessageService]
})
export class UserCreateComponent implements OnInit {

  email: string;
  givenName: string;
  familyName: string;
  password: string;
  passwordValidation: string;
  spinnerOn: boolean = false;

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  isValid(): boolean {
    return !(this.password === this.passwordValidation && this.password != null && this.email != null && this.familyName != null && this.givenName != null && this.password.length > 5);
  }

  public signUp() {
    this.spinnerOn = true;
    Auth.signUp({
      username: this.email,
      password: this.password,
      attributes: {
        given_name: this.givenName,
        family_name: this.familyName,
      }
    }).then(res => {
      if (res.userConfirmed) {
        this.showSuccess(this.givenName + " " + this.familyName + " kreiran")
      }
    }).catch(reason => {
      this.showError(reason.message);
    }).finally(() => this.spinnerOn = false);
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
