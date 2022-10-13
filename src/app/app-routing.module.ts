import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LastPaymentsComponent} from "./last-payments/last-payments.component";
import {CurrentStaysComponent} from "./current-stays/current-stays.component";

const routes: Routes = [
  {path: 'payments', component: LastPaymentsComponent},
  {path: '', component: CurrentStaysComponent}
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
