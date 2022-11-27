import { ICurrentStay } from './current-stay.interface';

export interface ICurrentStayResponse {
  numberOfStays: number;
  stayList: ICurrentStay[];
}
