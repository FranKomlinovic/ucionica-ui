import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { IEvent } from '../../interfaces/event.interface';
import { BackendService } from '../../backend.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FeedbackService } from 'src/app/services/feedback.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    providers: [MessageService],
})
export class EventsComponent implements OnInit {
    //Display controls
    displayDialog: boolean = false;
    showSpinner: boolean = true;

    //Form controls
    selectedUserAdvanced: IUser[];

    formGroup = new FormGroup({
        name: new FormControl('', {
            nonNullable: true,
            validators: Validators.required,
        }),
        description: new FormControl(''),
        picture: new FormControl(''),
        users: new FormControl(['']),
        startTime: new FormControl('', {
            validators: Validators.required,
        }),
        endTime: new FormControl('', {
            validators: Validators.required,
        }),
    });

    allEvents$ = new Subject<IEvent[]>();
    users$ = new Subject<IUser[]>();
    destroy$ = new Subject<boolean>();

    constructor(
        private backendService: BackendService,
        private confirmationService: ConfirmationService,
        private feedbackService: FeedbackService
    ) {}

    ngOnInit(): void {
        // this.loadUsers();
        this.loadEvents();
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
                    this.loadEvents();
                    this.feedbackService.successToast(
                        'Uspješno ste obrisali događaj'
                    );
                },
                error: () => {
                    this.toggleSpinner(false);
                    this.feedbackService.errorToast(
                        'Vjerojatno ste obrisali događaj, fixaj ovo'
                    );
                },
            });
    }

    createEvent() {
        this.showSpinner = true;
        this.backendService
            .createEvent(this.formGroup.getRawValue())
            .subscribe({
                next: () => {
                    this.feedbackService.successToast(
                        'Uspješno ste kreirali događaj'
                    );
                    this.loadEvents();
                    this.displayDialog = false;
                },
                error: (err: HttpErrorResponse) => {
                    this.toggleSpinner(false);
                    this.displayDialog = false;
                    this.feedbackService.errorToast(err.message);
                },
            });
    }

    editEvent(event: IEvent) {
        this.openDialog();
        this.formGroup.patchValue(event);
    }

    openDialog() {
        this.displayDialog = true;
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
