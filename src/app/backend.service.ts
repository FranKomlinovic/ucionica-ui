import {Injectable} from '@angular/core';
import {PaymentsModel} from "./models/payments-model.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "./models/user.model";
import {MessageResponse} from "./models/MessageResponse";
import {PaymentCreate} from "./models/PaymentCreate";
import {CurrentStayModel} from "./models/CurrentStay.model";
import {CreateStayModel} from "./models/CreateStay";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  rootUrl = "https://ua1sevlcal.execute-api.eu-central-1.amazonaws.com/prod";

  constructor(private http: HttpClient) {
  }

  getAllPayments(): Observable<PaymentsModel[]> {
    return this.http.get<PaymentsModel[]>(this.rootUrl + "/get-payments")
  }

  deletePayment(id: string): Observable<any> {
    return this.http.delete<any>(this.rootUrl + "/delete-payment/" + id)

  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.rootUrl + "/get-users");
  }

  postPayment(userId: string, amount: number): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this.rootUrl + "/create-payment",
      new PaymentCreate(userId, amount));
  }

  getAllStays(): Observable<CurrentStayModel[]> {
    return this.http.get<CurrentStayModel[]>(this.rootUrl + "/stays");
  }

  getNonStayUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.rootUrl + "/non-stay-users");
  }

  postStay(userId: string, date: Date): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this.rootUrl + "/evident-stay", new CreateStayModel(userId, date))
  }

  endAllStays(): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(this.rootUrl + "/end-current-stays");
  }

}
