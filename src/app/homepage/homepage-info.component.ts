import {Component, OnInit} from '@angular/core';
import {Auth} from 'aws-amplify';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage-component.html',
  styleUrls: ['./homepage-info.component.scss'],
  providers: [MessageService],
})
export class HomepageInfoComponent implements OnInit {
  constructor() {
  }

  spinnerOn: boolean;
  userId: string;
  test: boolean;

  ngOnInit() {
    this.getAuthenticatedUser();
  }

  getAuthenticatedUser() {
    this.spinnerOn = true;
    Auth.currentAuthenticatedUser().then((data) => {
      this.userId = data.username;
      this.test = true;
      this.spinnerOn = false;
    });
  }


}
