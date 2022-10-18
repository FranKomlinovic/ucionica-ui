import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserDetails} from "../models/UserDetails";
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private backendService: BackendService) {
  }

  userDetails: UserDetails = new UserDetails();

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.backendService.getUserDetails(params.get("userId")).subscribe(a => {
        this.userDetails = a;
        console.log(a);
      });
    });
  }

}
