import { Injectable } from '@angular/core';
import { IPayment } from './interfaces/payments.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user.interface';
import { IMessageResponse } from './interfaces/message-response.interface';
import { PaymentCreate } from './models/payment-create.model';
import { ICurrentStay } from './interfaces/current-stay.interface';
import { IHighestDebt } from './interfaces/highest-debt.interface';
import { IUserDetails } from './interfaces/user-details.interface';
import { CreateStayModel } from './models/create-stay.model';
import { CreateEventModel } from './models/create-event.model';
import { IEvent } from './interfaces/event.interface';

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

  getAllPayments(): Observable<IPayment[]> {
    return this.http.get<IPayment[]>(this.paymentsUrl);
  }

  deletePayment(id: string): Observable<IMessageResponse> {
    return this.http.delete<IMessageResponse>(this.paymentsUrl + '/' + id);
  }

  deleteEvent(id: string): Observable<IMessageResponse> {
    return this.http.delete<IMessageResponse>(this.eventsUrl + '/' + id);
  }

  getUserDetails(id: string | null): Observable<IUserDetails> {
    return this.http.get<IUserDetails>(this.usersUrl + '/' + id);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl);
  }

  postPayment(userId: string, amount: number): Observable<IMessageResponse> {
    return this.http.post<IMessageResponse>(
      this.paymentsUrl,
      new PaymentCreate(userId, amount)
    );
  }

  getAllStays(): Observable<ICurrentStay[]> {
    return this.http.get<ICurrentStay[]>(this.staysUrl);
  }

  getAllEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.eventsUrl);
  }

  getEventsByUserId(userId: string): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.eventsUrl + '/user/' + userId);
  }

  getEventById(id: string): Observable<CreateEventModel> {
    return this.http.get<CreateEventModel>(this.eventsUrl + '/' + id);
  }

  getHighestDebt(): Observable<IHighestDebt[]> {
    return this.http.get<IHighestDebt[]>(this.highestDebtUrl);
  }

  getHighestCredit(): Observable<IHighestDebt[]> {
    return this.http.get<IHighestDebt[]>(this.highestCreditUrl);
  }

  postStay(userId: string, date: Date): Observable<IMessageResponse> {
    return this.http.post<IMessageResponse>(
      this.staysUrl,
      new CreateStayModel(userId, date)
    );
  }

  createEvent(event: CreateEventModel): Observable<IMessageResponse> {
    return this.http.post<IMessageResponse>(this.eventsUrl, event);
  }

  endAllStays(): Observable<IMessageResponse> {
    return this.http.delete<IMessageResponse>(this.staysUrl);
  }
}
