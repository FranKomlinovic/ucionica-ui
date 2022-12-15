import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../../backend.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IUserDetails } from '../../interfaces/user-details.interface';
import { IEvent } from '../../interfaces/event.interface';
import { takeUntil } from 'rxjs/operators';
import { FeedbackService } from '../../services/feedback.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Auth, Storage } from 'aws-amplify';
import { FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
    providers: [MessageService],
})
export class UserInfoComponent implements OnInit {
    @Input() userId: string;
    @Input() readOnly: boolean;
    @ViewChild(FileUpload) fileUpload: FileUpload;

    userEvents$ = new BehaviorSubject<IEvent[] | null>(null);
    userDetails$ = new BehaviorSubject<IUserDetails | null>(null);
    destroy$ = new Subject<boolean>();

    constructor(
        private backendService: BackendService,
        private confirmationService: ConfirmationService,
        private feedbackService: FeedbackService
    ) {}

    ngOnInit() {
        this.loadUserDetails();
        this.loadUserEvents();
    }

    loadUserEvents(): void {
        this.userEvents$.next(new Array(2).fill(null));
        this.backendService
            .getEventsByUserId(this.userId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((events: IEvent[]) => {
                this.userEvents$.next(events);
            });
    }

    loadUserDetails(): void {
        this.backendService
            .getUserDetails(this.userId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((details: IUserDetails) => {
                this.userDetails$.next(details);
            });
    }

    upload(event: any) {
        this.feedbackService.spinner$.next(true);

        Auth.currentAuthenticatedUser().then((a) => {
            let file = event.files[0];
            Storage.put(file.name, file).then((result) => {
                Auth.updateUserAttributes(a, {
                    picture:
                        'https://ucionica-pictures.s3.eu-central-1.amazonaws.com/public/' +
                        result.key,
                }).then(() => {
                    this.feedbackService.spinner(false);
                    this.fileUpload.clear();
                    this.loadUserDetails();
                });
            });
        });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
