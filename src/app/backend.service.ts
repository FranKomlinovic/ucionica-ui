import {Injectable} from '@angular/core';
import {PaymentsModel} from "./models/payments-model.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "./models/user.model";
import {MessageResponse} from "./models/MessageResponse";
import {PaymentCreate} from "./models/PaymentCreate";
import {CurrentStayModel} from "./models/CurrentStay.model";
import {CreateStayModel} from "./models/CreateStay";
import {HighestDebt} from "./models/HighestDebt";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  rootUrl = "https://ua1sevlcal.execute-api.eu-central-1.amazonaws.com/prod";
  staysUrl = this.rootUrl + "/stays";
  usersUrl = this.rootUrl + "/users";
  paymentsUrl = this.rootUrl + "/payments";
  highestDebtUrl = this.rootUrl + "/users/highest-debt";

  constructor(private http: HttpClient) {
  }

  getAllPayments(): Observable<PaymentsModel[]> {
    return this.http.get<PaymentsModel[]>(this.paymentsUrl)
  }

  deletePayment(id: string): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(this.paymentsUrl + "/" + id)

  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.usersUrl);
  }

  postPayment(userId: string, amount: number): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this.paymentsUrl,
      new PaymentCreate(userId, amount));
  }

  getAllStays(): Observable<CurrentStayModel[]> {
    return this.http.get<CurrentStayModel[]>(this.staysUrl);
  }

  getHighestDebt(): Observable<HighestDebt[]> {
    return this.http.get<HighestDebt[]>(this.highestDebtUrl);
  }

  postStay(userId: string, date: Date): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this.staysUrl, new CreateStayModel(userId, date))
  }

  endAllStays(): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(this.staysUrl);
  }

}
