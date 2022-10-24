import {UserStayModel} from "./UserStayModel";
import {UserPaymentModel} from "./UserPaymentModel";

export class UserDetails {
  id: string;
  username: string;
  balance: string;
  picture: string;
  currentlyActive: boolean;
  stays: UserStayModel[];
  payments: UserPaymentModel[];
}
