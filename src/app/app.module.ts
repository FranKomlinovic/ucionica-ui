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
import { AppRoutingModule } from './app-routing.module';
import { CurrentStaysComponent } from './components/current-stays/current-stays.component';
import { HighestDebtComponent } from './components/highest-debt/highest-debt.component';
import { HomepageInfoComponent } from './homepage/homepage-info.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from './modules/shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { HighestCreditComponent } from './components/highest-credit/highest-credit.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { EventsComponent } from './components/events/events.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FeedbackService } from './services/feedback.service';
import { MenuComponent } from './menu/menu.component';

Amplify.configure({
  Auth: {
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_zpNOTpJzD',
    userPoolWebClientId: '5abotfe77buga1l7kavuusjlfj',
    mandatorySignIn: 'enable',
  },
  Storage: {
    bucket: 'ucionica-pictures/profile/',
    region: 'eu-central-1',
  },
});

@NgModule({
  declarations: [
    AppComponent,
    LastPaymentsComponent,
    CurrentStaysComponent,
    HighestDebtComponent,
    HomepageInfoComponent,
    UserInfoComponent,
    UserCreateComponent,
    HighestCreditComponent,
    EventsComponent,
    MenuComponent,
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
    MultiSelectModule,
    InputTextModule,
    PasswordModule,
    FileUploadModule,
    InputTextareaModule,
    SharedModule,
  ],
  providers: [ConfirmationService, FeedbackService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
