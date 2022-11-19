import { Injectable } from '@angular/core';
import { PaymentsModel } from './interfaces/payments.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user.interface';
import { MessageResponse } from './interfaces/message-response';
import { PaymentCreate } from './models/payment-create.model';
import { CurrentStayModel } from './interfaces/current-stay.interface';
import { HighestDebt } from './interfaces/highest-debt';
import { UserDetails } from './models/user.details.model';
import { CreateStayModel } from './models/create-stay.model';
import { CreateEventModel } from './models/create-event.model';
import { IEvent } from './interfaces/events';

@Injectable({
    providedIn: 'root',
})
export class BackendService {
    rootUrl = 'https://ua1sevlcal.execute-api.eu-central-1.amazonaws.com/prod';
    staysUrl = this.rootUrl + '/stays';
    usersUrl = this.rootUrl + '/users';
    eventsUrl = this.rootUrl + '/events';
    paymentsUrl = this.rootUrl + '/payments';
    highestDebtUrl = this.rootUrl + '/users/highest-debt';
    highestCreditUrl = this.rootUrl + '/users/highest-credit';

    constructor(private http: HttpClient) {}

    getAllPayments(): Observable<PaymentsModel[]> {
        return this.http.get<PaymentsModel[]>(this.paymentsUrl);
    }

    deletePayment(id: string): Observable<MessageResponse> {
        return this.http.delete<MessageResponse>(this.paymentsUrl + '/' + id);
    }

    deleteEvent(id: string): Observable<MessageResponse> {
        return this.http.delete<MessageResponse>(this.eventsUrl + '/' + id);
    }

    getUserDetails(id: string | null): Observable<UserDetails> {
        return this.http.get<UserDetails>(this.usersUrl + '/' + id);
    }

    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.usersUrl);
    }

    postPayment(userId: string, amount: number): Observable<MessageResponse> {
        return this.http.post<MessageResponse>(
            this.paymentsUrl,
            new PaymentCreate(userId, amount)
        );
    }

    getAllStays(): Observable<CurrentStayModel[]> {
        return this.http.get<CurrentStayModel[]>(this.staysUrl);
    }

    getAllEvents(): Observable<IEvent[]> {
        return this.http.get<IEvent[]>(this.eventsUrl);
    }

    getEventsByUserId(userId: string): Observable<IEvent[]> {
        return this.http.get<IEvent[]>(this.eventsUrl + '/' + userId);
    }

    getHighestDebt(): Observable<HighestDebt[]> {
        return this.http.get<HighestDebt[]>(this.highestDebtUrl);
    }

    getHighestCredit(): Observable<HighestDebt[]> {
        return this.http.get<HighestDebt[]>(this.highestCreditUrl);
    }

    postStay(userId: string, date: Date): Observable<MessageResponse> {
        return this.http.post<MessageResponse>(
            this.staysUrl,
            new CreateStayModel(userId, date)
        );
    }

    postEvent(event: CreateEventModel): Observable<MessageResponse> {
        return this.http.post<MessageResponse>(this.eventsUrl, event);
    }

    endAllStays(): Observable<MessageResponse> {
        return this.http.delete<MessageResponse>(this.staysUrl);
    }
}
