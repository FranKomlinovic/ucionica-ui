import { IUserPayment } from '../interfaces/user-payment.interface';
import { IUserStay } from '../interfaces/user-stay.interface';

export class UserDetails {
    id: string;
    username: string;
    balance: string;
    picture: string;
    currentlyActive: boolean;
    stays: IUserStay[];
    payments: IUserPayment[];
}
