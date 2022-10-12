import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaymentsModel} from "../models/payments-model.model";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {UserModel} from "../models/user.model";
import {MessageResponse} from "../models/MessageResponse";
import {PaymentCreate} from "../models/PaymentCreate";

@Component({
  selector: 'app-last-payments',
  templateUrl: './last-payments.component.html',
  styleUrls: ['./last-payments.component.css'],
  providers: [MessageService]
})
export class LastPaymentsComponent implements OnInit {

  lastPayments: PaymentsModel[] = [];
  displayDialog: boolean = false;
  selectedUserAdvanced: UserModel | undefined;
  amount: number = 100;
  date: Date = new Date();
  time: Date = new Date;
  filteredUsers: UserModel[] = [];
  users: UserModel[] = [];
  paymentCreateUrl = "https://ua1sevlcal.execute-api.eu-central-1.amazonaws.com/prod/create-payment";


  getAllPayments() {
    this.http.get<PaymentsModel[]>("https://ua1sevlcal.execute-api.eu-central-1.amazonaws.com/prod/get-payments")
      .subscribe((data) => {
          this.lastPayments = data;
        }
      );
  }

  deletePayment(id: string) {
    this.http.get<PaymentsModel[]>("https://ua1sevlcal.execute-api.eu-central-1.amazonaws.com/prod/delete-payment/" + id)
      .subscribe((data) => {
          this.lastPayments = data;
        }
      );
  }

  ngOnInit(): void {
    this.getAllPayments();
    this.http.get<UserModel[]>("https://ua1sevlcal.execute-api.eu-central-1.amazonaws.com/prod/get-users")
      .subscribe((data) => {
          this.users = data;
        }
      );
    this.primengConfig.ripple = true;


  }


  constructor(private http: HttpClient, private primengConfig: PrimeNGConfig, private messageService: MessageService) {
  }

  savePayment() {

    if (this.selectedUserAdvanced === undefined) {
      return;
    }

    this.http.post<MessageResponse>(this.paymentCreateUrl, new PaymentCreate(this.selectedUserAdvanced.id, this.amount))
      .pipe().subscribe(response => {
      this.showSuccess(response.message);
      this.getAllPayments();
      this.displayDialog = false;
    });

  }

  showSuccess(message: string) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: message});
  }


  showBasicDialog() {
    this.displayDialog = true;
  }

  filterCountry(event: any) {
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

