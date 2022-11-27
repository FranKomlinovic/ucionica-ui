import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LastPaymentsComponent } from './components/last-payments/last-payments.component';
import { CurrentStaysComponent } from './components/current-stays/current-stays.component';
import { HighestDebtComponent } from './components/highest-debt/highest-debt.component';
import { HomepageInfoComponent } from './homepage/homepage-info.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { HighestCreditComponent } from './components/highest-credit/highest-credit.component';
import { EventsComponent } from './components/events/events.component';

const routes: Routes = [
  { path: 'payments', component: LastPaymentsComponent },
  { path: 'stays', component: CurrentStaysComponent },
  { path: 'debtors', component: HighestDebtComponent },
  { path: 'creditors', component: HighestCreditComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'events', component: EventsComponent },
  { path: '', component: HomepageInfoComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
