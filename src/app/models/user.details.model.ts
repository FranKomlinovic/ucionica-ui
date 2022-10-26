import { UserPaymentModel } from '../interfaces/user-payment.model';
import { UserStayModel } from '../interfaces/user-stay.model';

export class UserDetails {
  id: string;
  username: string;
  balance: string;
  picture: string;
  currentlyActive: boolean;
  stays: UserStayModel[];
  payments: UserPaymentModel[];
}
