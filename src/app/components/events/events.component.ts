import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../interfaces/user.interface";
import {Events} from "../../interfaces/events";
import {BackendService} from "../../backend.service";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {CreateEventModel} from "../../models/create-event.model";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [MessageService]
})
export class EventsComponent implements OnInit {
  //Display controls
  displayDialog: boolean = false;
  spinnerOn: boolean = false;
  //Form controls
  selectedUserAdvanced: UserModel[];
  startTime: Date = new Date();
  endTime: Date = new Date();
  name: string;
  description: string;
  users: UserModel[] = [];
  //Grid controls
  allEvents: Events[] = [];

  constructor(
    private backendService: BackendService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
  }

  ngOnInit(): void {
    this.getAllEvents();
    this.primengConfig.ripple = true;
  }

  confirm(id: string) {
    this.confirmationService.confirm({
      message: 'Jeste li sigurni da želite obrisati događaj?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteEvent(id);
        this.confirmationService.close();
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

  deleteEvent(id: string) {
    this.spinnerOn = true;
    this.backendService.deleteEvent(id).subscribe({
      next: () => {
        this.getAllEvents();
        this.showSuccess("Uspješno ste obrisali događaj");
        this.spinnerOn = false;
      },
      error: () => {
        this.showSuccess("Vjerojatno ste obrisali događaj, fixaj ovo");
        this.getAllEvents();
        this.spinnerOn = false;
      }
    });
  }

  getAllEvents() {
    this.spinnerOn = true;
    this.backendService.getAllEvents().subscribe((data: Events[]) => {
      this.allEvents = data;
      this.displayDialog = false;
      this.spinnerOn = false;
    });

    this.backendService.getUsers().subscribe((data) => {
      this.users = data;
      this.selectedUserAdvanced = [];
    });
  }

  postEvent() {
    let event = new CreateEventModel(this.name, this.description, this.selectedUserAdvanced.map(a => a.id), this.startTime, this.endTime)
    this.spinnerOn = true;
    this.backendService
      .postEvent(event)
      .pipe()
      .subscribe((response) => {
        this.showSuccess(response.message);
        this.getAllEvents();
        this.spinnerOn = false;
      });
  }

  openDialog() {
    this.displayDialog = true
    this.startTime = new Date();
    this.endTime = new Date();
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }


}
