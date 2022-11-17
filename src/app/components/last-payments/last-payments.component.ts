import {Component, OnInit} from '@angular/core';
import {PaymentsModel} from "../../interfaces/payments.interface";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {IUser} from "../../interfaces/user.interface";
import {BackendService} from "../../backend.service";

@Component({
  selector: 'app-last-payments',
  templateUrl: './last-payments.component.html',
  styleUrls: ['./last-payments.component.scss'],
  providers: [MessageService]
})
export class LastPaymentsComponent implements OnInit {

  //Display controls
  displayDialog: boolean = false;
  spinnerOn: boolean = false;
  //Form controls
  amount: number = 100;
  date: Date = new Date();
  time: Date = new Date();
  selectedUserAdvanced: IUser | undefined;
  filteredUsers: IUser[] = [];
  users: IUser[] = [];
  //Grid controls
  lastPayments: PaymentsModel[] = [];

  constructor(private backendService: BackendService, private primengConfig: PrimeNGConfig, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getAllPayments();
    this.getAllUsers();
    this.primengConfig.ripple = true;
  }

  getAllUsers() {
    this.backendService.getUsers()
      .subscribe((data) => {
          this.users = data;
        }
      );
  }

  getAllPayments() {
    this.spinnerOn = true;
    this.backendService.getAllPayments().subscribe((data) => {
        this.lastPayments = data;
        this.spinnerOn = false;
      }
    );
  }

  deletePayment(id: string) {
    this.spinnerOn = true;
    this.backendService.deletePayment(id).subscribe({
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

  openDialog() {
    this.displayDialog = true
    this.date = new Date();
    this.time = new Date();
  }

  savePayment() {
    this.spinnerOn = true;
    if (this.selectedUserAdvanced === undefined) {
      return;
    }
    this.backendService.postPayment(this.selectedUserAdvanced.id, this.amount).pipe().subscribe(response => {
      this.showSuccess(response.message);
      this.getAllPayments();
      this.displayDialog = false;
      this.spinnerOn = false;
    });

  }

  confirm(id: string) {
    this.confirmationService.confirm({
      message: 'Jeste li sigurni da želite obrisati uplatu?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePayment(id);
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

  showSuccess(message: string) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: message});
  }

  filterPayments(event: any) {
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

