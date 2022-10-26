import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LastPaymentsComponent} from "./components/last-payments/last-payments.component";
import {CurrentStaysComponent} from "./components/current-stays/current-stays.component";
import {HighestDebtComponent} from "./components/highest-debt/highest-debt.component";
import {UserInfoComponent} from "./user-info/user-info.component";

const routes: Routes = [
  {path: 'payments', component: LastPaymentsComponent},
  {path: 'stays', component: CurrentStaysComponent},
  {path: 'debtors', component: HighestDebtComponent},
  {path: '', component: UserInfoComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
