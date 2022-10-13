import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaymentsModel} from "../models/payments-model.model";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
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
  spinnerOn: boolean = false;
  selectedUserAdvanced: UserModel | undefined;
  amount: number = 100;
  date: Date = new Date();
  time: Date = new Date;
  filteredUsers: UserModel[] = [];
  users: UserModel[] = [];
  paymentCreateUrl = "https://ua1sevlcal.execute-api.eu-central-1.amazonaws.com/prod/create-payment";


  getAllPayments() {
    this.spinnerOn = true;
    this.http.get<PaymentsModel[]>("https://ua1sevlcal.execute-api.eu-central-1.amazonaws.com/prod/get-payments")
      .subscribe((data) => {
          this.lastPayments = data;
          this.spinnerOn = false;
        }
      );
  }

  deletePayment(id: string) {
    this.spinnerOn = true;
    this.http.delete<any>("https://ua1sevlcal.execute-api.eu-central-1.amazonaws.com/prod/delete-payment/" + id)
      .subscribe({
        next: () => {
          this.getAllPayments();
          this.showSuccess("Uspješno ste obrisali uplatu");
          this.spinnerOn = false;
        },
        error: () => {
          this.showSuccess("Vjerojatno ste obrisali upravu, fixaj ovo");
          this.getAllPayments();
          this.spinnerOn = false;
        }
      });
  }

  ngOnInit(): void {
    this.spinnerOn = true;
    this.getAllPayments();
    this.http.get<UserModel[]>("https://ua1sevlcal.execute-api.eu-central-1.amazonaws.com/prod/get-users")
      .subscribe((data) => {
          this.users = data;
          this.spinnerOn = false;
        }
      );
    this.primengConfig.ripple = true;


  }


  constructor(private http: HttpClient, private primengConfig: PrimeNGConfig, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  confirm(id: string) {
    this.confirmationService.confirm({
      message: 'Jeste li sigurni da želite obrisati uplatu?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePayment(id);
      },
      reject: () => {
        this.getAllPayments();
      }
    });
  }

  savePayment() {
    this.spinnerOn = true;
    if (this.selectedUserAdvanced === undefined) {
      return;
    }

    this.http.post<MessageResponse>(this.paymentCreateUrl, new PaymentCreate(this.selectedUserAdvanced.id, this.amount))
      .pipe().subscribe(response => {
      this.showSuccess(response.message);
      this.getAllPayments();
      this.displayDialog = false;
      this.spinnerOn = false;
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

