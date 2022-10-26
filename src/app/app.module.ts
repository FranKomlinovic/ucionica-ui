import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { AppComponent } from './app.component';
import { Amplify } from 'aws-amplify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LastPaymentsComponent } from './components/last-payments/last-payments.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UcionicaMenuComponent } from './ucionica-menu/ucionica-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrentStaysComponent } from './components/current-stays/current-stays.component';
import { HighestDebtComponent } from './components/highest-debt/highest-debt.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfirmationService } from 'primeng/api';
import { SharedModule } from './modules/shared/shared.module';

Amplify.configure({
  aws_cognito_region: 'eu-central-1', // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id: 'eu-central-1_zpNOTpJzD', // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: '5abotfe77buga1l7kavuusjlfj', // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
  aws_mandatory_sign_in: 'enable', // (optional) - Users are not allowed to get the aws credentials unless they are signed in
});

@NgModule({
  declarations: [
    AppComponent,
    LastPaymentsComponent,
    UcionicaMenuComponent,
    CurrentStaysComponent,
    HighestDebtComponent,
    UserInfoComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AmplifyAuthenticatorModule,
    BrowserAnimationsModule,
    RouterLinkWithHref,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
