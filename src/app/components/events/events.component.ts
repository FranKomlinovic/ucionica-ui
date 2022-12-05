import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { IEvent } from '../../interfaces/event.interface';
import { BackendService } from '../../backend.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { FeedbackService } from 'src/app/services/feedback.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    providers: [MessageService],
})
export class EventsComponent implements OnInit {
    skeletonLoader = new Array(5).fill(null);
    displayDialog: boolean;
    today: Date = new Date();

    allEvents$ = new BehaviorSubject<IEvent[] | null>(null);
    users$ = new Subject<IUser[]>();
    destroy$ = new Subject<boolean>();

    formGroup = new FormGroup({
        id: new FormControl<string>(''),
        name: new FormControl<string>('', {
            nonNullable: true,
            validators: Validators.required,
        }),
        description: new FormControl<string>(''),
        picture: new FormControl<string>(''),
        users: new FormControl<string[]>([]),
        startTime: new FormControl<Date | null>(null, {
            validators: Validators.required,
        }),
        endTime: new FormControl<Date | null>(null, {
            validators: Validators.required,
        }),
    });

    constructor(
        private backendService: BackendService,
        private confirmationService: ConfirmationService,
        private feedbackService: FeedbackService
    ) {}

    ngOnInit(): void {
        this.loadEvents();
        this.loadUsers();
    }

    loadEvents(): void {
        this.allEvents$.next(this.skeletonLoader);
        this.backendService
            .getAllEvents()
            .pipe(takeUntil(this.destroy$))
            .subscribe((events: IEvent[]) => {
                this.allEvents$.next(events);
            });
    }

    loadUsers() {
        this.backendService
            .getUsers()
            .pipe(takeUntil(this.destroy$))
            .subscribe((users: IUser[]) => {
                this.users$.next(users);
            });
    }

    deleteClick(id: string) {
        this.confirmationService.confirm({
            message: 'Jeste li sigurni da želite obrisati događaj?',
            accept: () => {
                this.deleteEvent(id);
            },
        });
    }

    deleteEvent(id: string) {
        this.feedbackService.spinner(true);
        this.backendService.deleteEvent(id).subscribe({
            next: (a) => {
                this.loadEvents();
                this.feedbackService.successToast(a.message);
            },
            error: () => {
                this.feedbackService.errorToast(
                    'Vjerojatno ste obrisali događaj, fixaj ovo'
                );
            },
        });
    }

    createEvent() {
        const eventData = this.formGroup.getRawValue();
        this.feedbackService.spinner(true);
        this.backendService.createEvent(eventData).subscribe({
            next: (a) => {
                this.feedbackService.successToast(a.message);
                this.loadEvents();
                this.displayDialog = false;
            },
            error: (err: HttpErrorResponse) => {
                this.displayDialog = false;
                this.feedbackService.errorToast(err.message);
            },
        });
    }

    editEvent(eventId: string) {
        this.openDialog();
        this.feedbackService.spinner(true);
        this.backendService
            .getEventById(eventId)
            .pipe(
                map((res) => ({
                    ...res,
                    startTime: new Date(res.startTime!),
                    endTime: new Date(res.endTime!),
                })),
                takeUntil(this.destroy$)
            )
            .subscribe((value) => {
                this.formGroup.patchValue(value);
                this.feedbackService.spinner(false);
            });
    }

    openDialog() {
        this.displayDialog = true;
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
