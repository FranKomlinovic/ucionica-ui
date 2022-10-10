import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { AppComponent } from './app.component';
import {Amplify} from "aws-amplify";

Amplify.configure({
  aws_cognito_region: 'eu-central-1', // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id: 'eu-central-1_11B0dPaGy', // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: '41j9f3clgq9hotur5r9n28o91t', // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
  aws_mandatory_sign_in: 'enable' // (optional) - Users are not allowed to get the aws credentials unless they are signed in
});

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AmplifyAuthenticatorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
