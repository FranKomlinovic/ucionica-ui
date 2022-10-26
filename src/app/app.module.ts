import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AmplifyAuthenticatorModule} from '@aws-amplify/ui-angular';
import {AppComponent} from './app.component';
import {Amplify} from 'aws-amplify';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LastPaymentsComponent} from './components/last-payments/last-payments.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterLinkWithHref, RouterOutlet} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UcionicaMenuComponent} from './ucionica-menu/ucionica-menu.component';
import {AppRoutingModule} from './app-routing.module';
import {CurrentStaysComponent} from './components/current-stays/current-stays.component';
import {HighestDebtComponent} from './components/highest-debt/highest-debt.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ConfirmationService} from 'primeng/api';
import {SharedModule} from './modules/shared/shared.module';
import {MultiSelectModule} from "primeng/multiselect";
import {UserCreateComponent} from './components/user-create/user-create.component';
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {FileUploadModule} from "primeng/fileupload";

Amplify.configure({
    Auth: {
      region: 'eu-central-1',
      userPoolId: 'eu-central-1_zpNOTpJzD',
      userPoolWebClientId: '5abotfe77buga1l7kavuusjlfj',
      mandatorySignIn: 'enable'
    },
    Storage: {
      bucket: 'ucionica-pictures/profile/',
      region: 'eu-central-1',
    }
  }
);

@NgModule({
  declarations: [
    AppComponent,
    LastPaymentsComponent,
    UcionicaMenuComponent,
    CurrentStaysComponent,
    HighestDebtComponent,
    UserInfoComponent,
    UserCreateComponent,
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
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
