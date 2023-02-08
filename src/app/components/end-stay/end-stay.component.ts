import { Component, OnInit } from '@angular/core';
import { ICurrentStay } from '../../interfaces/current-stay.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FeedbackService } from '../../services/feedback.service';
import { BackendService } from '../../backend.service';

@Component({
    selector: 'app-end-stay',
    templateUrl: './end-stay.component.html',
    styleUrls: ['./end-stay.component.scss'],
})
export class EndStayComponent implements OnInit {
    stayToEnd: ICurrentStay;
    date: Date = new Date();

    constructor(
        public config: DynamicDialogConfig,
        private feedbackService: FeedbackService,
        private backendService: BackendService,
        public ref: DynamicDialogRef
    ) {}

    ngOnInit(): void {
        this.stayToEnd = this.config.data;
    }

    endStay() {
        this.feedbackService.spinner(true);
        this.backendService
            .endStay(this.stayToEnd.userId, this.date)
            .subscribe({
                next: (a) => {
                    this.feedbackService.spinner(false);
                    this.feedbackService.successToast(a.message);
                    this.ref.close();
                },
                error: (err: HttpErrorResponse) => {
                    this.feedbackService.spinner(false);
                    this.feedbackService.errorToast(err.message);
                },
            });
    }
}
