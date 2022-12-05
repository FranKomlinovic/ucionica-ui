import { IUserPayment } from './user-payment.interface';
import { IUserStay } from './user-stay.interface';

export class IUserDetails {
    id: string;
    username: string;
    balance: string;
    picture: string;
    timeSpent: string;
    averageTimeSpent: string;
    totalPayments: string;
    totalStayPrice: string;
    averageStayPrice: string;
    currentlyActive: boolean;
    stays: IUserStay[];
    payments: IUserPayment[];
}
