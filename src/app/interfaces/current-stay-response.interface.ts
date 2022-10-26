import { CurrentStayModel } from './current-stay.interface';

export interface ICurrentStayResponseModel {
  numberOfStays: number;
  stayList: CurrentStayModel[];
}
