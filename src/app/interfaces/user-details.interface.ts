import { IUserPayment } from './user-payment.interface';
import { IUserStay } from './user-stay.interface';

export class IUserDetails {
  id: string;
  username: string;
  balance: string;
  picture: string;
  currentlyActive: boolean;
  stays: IUserStay[];
  payments: IUserPayment[];
}
