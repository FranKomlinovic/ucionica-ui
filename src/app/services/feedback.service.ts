import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class FeedbackService {
    constructor(private messageService: MessageService) {}

    successToast(message: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: message,
        });
    }

    errorToast(message: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
        });
    }
}
