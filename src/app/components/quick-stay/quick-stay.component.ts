import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/user.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BackendService } from '../../backend.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FeedbackService } from '../../services/feedback.service';

@Component({
    selector: 'app-quick-stay',
    templateUrl: './quick-stay.component.html',
    styleUrls: ['./quick-stay.component.scss'],
})
export class QuickStayComponent implements OnInit {
    users: IUser[] = [];
    users$ = new BehaviorSubject<IUser[]>(this.users);
    destroy$ = new Subject<boolean>();

    formGroup = new FormGroup({
        userId: new FormControl<string>('', {
            nonNullable: true,
            validators: Validators.required,
        }),
    });

    constructor(
        private backendService: BackendService,
        private feedbackService: FeedbackService
    ) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers() {
        this.backendService
            .getUsers()
            .pipe(takeUntil(this.destroy$))
            .subscribe((users: IUser[]) => {
                this.users = users;
                this.users$.next(users);
            });
    }

    filterUsers(event: { ogEvent: PointerEvent; query: string }) {
        this.users = this.users$.value.filter((user: IUser) =>
            user.username
                .toLowerCase()
                .includes(event.query.toLocaleLowerCase())
        );
    }

    selectUser(user: IUser) {
        this.formGroup
            .get('userId')
            ?.setValue(user.id, { emitModelToViewChange: false });
    }

    evidentStay() {
        this.feedbackService.spinner$.next(true);
        this.backendService
            .postStay(this.formGroup.getRawValue().userId, new Date())
            .subscribe({
                next: (a) => {
                    let message = a.message;
                    if (message.startsWith('Zbogom')) {
                        this.feedbackService.infoToast(message);
                    } else {
                        this.feedbackService.successToast(a.message);
                    }
                },
                error: (err: HttpErrorResponse) => {
                    this.feedbackService.errorToast(err.message);
                },
            });
    }
}
