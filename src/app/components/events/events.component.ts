import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { IEvent } from '../../interfaces/events';
import { BackendService } from '../../backend.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    providers: [MessageService],
})
export class EventsComponent implements OnInit {
    //Display controls
    displayDialog: boolean = false;
    showSpinner: boolean = false;

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

    allEvents$ = new Subject<IEvent[]>();
    users$ = new Subject<IUser[]>();
    destroy$ = new Subject<boolean>();

    constructor(
        private backendService: BackendService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadEvents();
        this.loadUsers();
    }

    loadEvents(): void {
        this.backendService
            .getAllEvents()
            .pipe(
                tap(() => this.toggleSpinner(true)),
                takeUntil(this.destroy$)
            )
            .subscribe((events: IEvent[]) => {
                this.allEvents$.next(events);
                this.toggleSpinner(false);
            });
    }

    loadUsers() {
        this.backendService
            .getUsers()
            .pipe(
                tap(() => this.toggleSpinner(true)),
                takeUntil(this.destroy$)
            )
            .subscribe((users: IUser[]) => {
                this.users$.next(users);
                this.toggleSpinner(false);
            });
    }

    toggleSpinner(value: boolean) {
        this.showSpinner = value;
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
            },
        });
    }

    deleteEvent(id: string) {
        this.backendService
            .deleteEvent(id)
            .pipe(tap(() => this.toggleSpinner(true)))
            .subscribe({
                next: () => {
                    this.toggleSpinner(false);
                    this.showSuccess('Uspješno ste obrisali događaj');
                    this.loadEvents();
                },
                error: () => {
                    this.toggleSpinner(false);
                    this.showSuccess(
                        'Vjerojatno ste obrisali događaj, fixaj ovo'
                    );
                },
            });
    }

    postEvent() {
        this.showSpinner = true;
        this.backendService
            .postEvent(this.formGroup.getRawValue())
            .subscribe((response) => {
                this.showSuccess(response.message);
                this.loadEvents();
                this.displayDialog = false;
            });
    }

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

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
