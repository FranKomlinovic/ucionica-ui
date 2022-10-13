import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AmplifyAuthenticatorModule} from '@aws-amplify/ui-angular';

import {AppComponent} from './app.component';
import {Amplify} from "aws-amplify";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LastPaymentsComponent} from './last-payments/last-payments.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TieredMenuModule} from "primeng/tieredmenu";
import {UcionicaMenuComponent} from './ucionica-menu/ucionica-menu.component';
import {MenuModule} from "primeng/menu";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { AppRoutingModule } from './app-routing.module';
import { CurrentStaysComponent } from './current-stays/current-stays.component';

Amplify.configure({
  aws_cognito_region: 'eu-central-1', // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id: 'eu-central-1_11B0dPaGy', // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: '41j9f3clgq9hotur5r9n28o91t', // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
  aws_mandatory_sign_in: 'enable' // (optional) - Users are not allowed to get the aws credentials unless they are signed in
});

@NgModule({
  declarations: [AppComponent, LastPaymentsComponent, UcionicaMenuComponent, CurrentStaysComponent],
  imports: [BrowserModule, HttpClientModule, AmplifyAuthenticatorModule, BrowserAnimationsModule, RouterLinkWithHref, RouterOutlet, ReactiveFormsModule, TieredMenuModule, MenuModule, RippleModule, ButtonModule, CardModule, DialogModule, AutoCompleteModule, FormsModule, InputNumberModule, CalendarModule, ToastModule, ProgressSpinnerModule, ConfirmDialogModule, AppRoutingModule],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
