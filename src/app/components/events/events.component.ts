import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { IEvent } from '../../interfaces/events';
import { BackendService } from '../../backend.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [MessageService],
})
export class EventsComponent implements OnInit {
  //Display controls
  displayDialog: boolean = false;
  spinnerOn: boolean = false;
  //Form controls
  selectedUserAdvanced: IUser[];
  users: IUser[] = [];
  allEvents: IEvent[] = [];

  formGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    description: new FormControl(''),
    picture: new FormControl(''),
    users: new FormControl([]),
    startTime: new FormControl(new Date().toISOString()),
    endTime: new FormControl(new Date().toISOString()),
  });

  allEvents$ = this.backendService.getAllEvents();
  users$ = this.backendService.getUsers();

  constructor(
    private backendService: BackendService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

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
      },
    });
  }

  deleteEvent(id: string) {
    this.spinnerOn = true;
    this.backendService.deleteEvent(id).subscribe({
      next: () => {
        // this.getAllEvents();
        this.showSuccess('Uspješno ste obrisali događaj');
        this.spinnerOn = false;
      },
      error: () => {
        this.showSuccess('Vjerojatno ste obrisali događaj, fixaj ovo');
        // this.getAllEvents();
        this.spinnerOn = false;
      },
    });
  }

  // getAllEvents() {
  //   this.spinnerOn = true;
  //   this.backendService.getAllEvents().subscribe((data: IEvent[]) => {
  //     this.allEvents = data;
  //     this.displayDialog = false;
  //     this.spinnerOn = false;
  //   });

  //   this.backendService.getUsers().subscribe((data) => {
  //     this.users = data;
  //     this.selectedUserAdvanced = [];
  //   });
  // }

  postEvent() {
    this.spinnerOn = true;
    this.backendService
      .postEvent(this.formGroup.getRawValue())
      .pipe()
      .subscribe((response) => {
        this.showSuccess(response.message);
        this.spinnerOn = false;
        this.displayDialog = false;
        // this.updateEvents();
      });
  }

  // updateEvents() {
  //   this.allEvents$ = this.backendService.getAllEvents();
  // }

  openDialog() {
    this.displayDialog = true;
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
}
