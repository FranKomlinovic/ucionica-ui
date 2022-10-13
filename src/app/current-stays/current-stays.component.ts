import {Component, OnInit} from '@angular/core';
import {CurrentStayModel} from "../models/CurrentStay.model";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {UserModel} from "../models/user.model";
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-current-stays',
  templateUrl: './current-stays.component.html',
  styleUrls: ['./current-stays.component.css'],
  providers: [MessageService]
})
export class CurrentStaysComponent implements OnInit {

  //Display controls
  displayDialog: boolean = false;
  spinnerOn: boolean = false;
  //Form controls
  selectedUserAdvanced: UserModel | undefined;
  date: Date = new Date();
  time: Date = new Date();
  filteredUsers: UserModel[] = [];
  users: UserModel[] = [];
  //Grid controls
  numberOfStays: number = 0;
  currentStays: CurrentStayModel[] = [];

  constructor(private backendService: BackendService, private confirmationService: ConfirmationService, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.getAllStays();
    this.primengConfig.ripple = true;
  }

  getAllStays() {
    this.spinnerOn = true;
    this.backendService.getAllStays().subscribe((data) => {
        this.currentStays = data
        this.numberOfStays = data.length;
        this.displayDialog = false;
        this.spinnerOn = false;
      }
    );

    this.backendService.getNonStayUsers().subscribe((data) => {
        this.users = data;
        this.spinnerOn = false;
        this.selectedUserAdvanced = undefined;
      }
    );
  }

  evidentStay(userId: string, date: Date) {
    this.spinnerOn = true;
    this.backendService.postStay(userId, date).pipe().subscribe(response => {
      this.showSuccess(response.message);
      this.getAllStays();
      this.spinnerOn = false;
    });
  }

  saveStay() {
    this.spinnerOn = true;
    if (this.selectedUserAdvanced === undefined) {
      return;
    }
    this.date.setTime(this.time.getTime());
    this.evidentStay(this.selectedUserAdvanced.id, this.date);
  }

  confirm(id: string) {
    this.confirmationService.confirm({
      message: 'Jeste li sigurni da želite završiti dejstvo za ovog korisnika?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.evidentStay(id, new Date());
      },
      reject: () => {
        this.getAllStays();
      }
    });
  }

  showSuccess(message: string) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: message});
  }

  filterStays(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.users.length; i++) {
      let user = this.users[i];
      if (user.username.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    }

    this.filteredUsers = filtered;
  }


}
