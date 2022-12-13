import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FeedbackService {
    spinner$ = new Subject();

    constructor(private messageService: MessageService) {}

    successToast(message: string) {
        this.spinner$.next(false);
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: message,
        });
    }

    errorToast(message: string) {
        this.spinner(false);
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
        });
    }

    infoToast(message: string) {
        this.spinner$.next(false);
        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: message,
        });
    }

    spinner(value: boolean) {
        this.spinner$.next(value);
    }
}
