import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../models/UserDetails';
import { BackendService } from '../backend.service';
import { Auth } from 'aws-amplify';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [MessageService],
})
export class UserInfoComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  userDetails: UserDetails = new UserDetails();
  spinnerOn: boolean;

  ngOnInit() {
    this.getAuthenticatedUser();
  }

  getAuthenticatedUser() {
    this.spinnerOn = true;
    Auth.currentAuthenticatedUser().then((data) => {
      this.backendService.getUserDetails(data.username).subscribe((a) => {
        this.userDetails = a;
        this.spinnerOn = false;
      });
    });
  }

  evidentStay(userId: string) {
    this.spinnerOn = true;
    this.backendService
      .postStay(userId, new Date())
      .pipe()
      .subscribe((response) => {
        this.showSuccess(response.message);
        this.getAuthenticatedUser();
        this.confirmationService.close();
      });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  confirmStay() {
    let message = 'Želite li se prijaviti u učionicu?';
    if (this.userDetails.currentlyActive) {
      message = 'Želite li se odjaviti iz učionice?';
    }

    this.confirmationService.confirm({
      message: message,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.evidentStay(this.userDetails.id);
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }
}
