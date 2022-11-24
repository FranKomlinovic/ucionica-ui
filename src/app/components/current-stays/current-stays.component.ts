import { Component, OnInit } from '@angular/core';
import { ICurrentStay } from '../../interfaces/current-stay.interface';
import {
    ConfirmationService,
    MessageService,
    PrimeNGConfig,
} from 'primeng/api';
import { IUser } from '../../interfaces/user.interface';
import { BackendService } from '../../backend.service';
import { Auth } from 'aws-amplify';

@Component({
    selector: 'app-current-stays',
    templateUrl: './current-stays.component.html',
    styleUrls: ['./current-stays.component.scss'],
    providers: [MessageService],
})
export class CurrentStaysComponent implements OnInit {
    //Display controls
    displayDialog: boolean = false;
    spinnerOn: boolean = false;
    admin: boolean = false;
    //Form controls
    selectedUserAdvanced: IUser[];
    date: Date = new Date();
    time: Date = new Date();
    users: IUser[] = [];
    //Grid controls
    numberOfStays: number = 0;
    currentStays: ICurrentStay[] = [];
    //User details
    selectedUserId: string;
    showDialog: boolean;

    constructor(
        private backendService: BackendService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private primengConfig: PrimeNGConfig
    ) {}

    ngOnInit(): void {
        this.getAllStays();
        this.primengConfig.ripple = true;

        Auth.currentAuthenticatedUser().then((data) => {
            let groups =
                data.signInUserSession.accessToken.payload['cognito:groups'];
            if (groups === undefined) {
                this.admin = false;
                return;
            }
            if (groups.includes('Generali')) {
                this.admin = true;
            }
        });
    }

    getAllStays() {
        this.spinnerOn = true;
        this.backendService.getAllStays().subscribe((data: ICurrentStay[]) => {
            this.currentStays = data;
            this.numberOfStays = data.length;
            this.displayDialog = false;
            this.spinnerOn = false;
        });

        this.backendService.getUsers().subscribe((data) => {
            this.users = data;
            this.selectedUserAdvanced = [];
        });
    }

    evidentStay(userId: string, date: Date) {
        this.spinnerOn = true;
        this.backendService
            .postStay(userId, date)
            .pipe()
            .subscribe((response) => {
                this.showSuccess(response.message);
                this.getAllStays();
                this.spinnerOn = false;
            });
    }

    endAllStays() {
        this.spinnerOn = true;
        this.backendService
            .endAllStays()
            .pipe()
            .subscribe((response) => {
                this.showSuccess(response.message);
                this.getAllStays();
                this.spinnerOn = false;
            });
    }

    openDialog() {
        this.displayDialog = true;
        this.date = new Date();
        this.time = new Date();
    }

    saveStay() {
        this.spinnerOn = true;
        if (this.selectedUserAdvanced === undefined) {
            return;
        }
        this.date.setTime(this.time.getTime());
        for (const userModel of this.selectedUserAdvanced) {
            this.evidentStay(userModel.id, this.date);
        }
    }

    confirmEndStay(id: string) {
        this.confirmationService.confirm({
            message:
                'Jeste li sigurni da želite završiti dejstvo za ovog korisnika?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.evidentStay(id, new Date());
                this.confirmationService.close();
            },
            reject: () => {
                this.confirmationService.close();
            },
        });
    }

    confirmEndAllStays() {
        this.confirmationService.confirm({
            message:
                'Jeste li sigurni da želite završiti dejstvo za sve korisnike?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.endAllStays();
                this.confirmationService.close();
            },
            reject: () => {
                this.confirmationService.close();
            },
        });
    }

    showSuccess(message: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: message,
        });
    }

    showInfo(userId: string) {
        this.selectedUserId = userId;
        this.showDialog = true;
    }
}
