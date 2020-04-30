import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostjobComponent } from './jobs/postjob/postjob.component';
import { UserjobsComponent } from './jobs/userjobs/userjobs.component';
import { AlljobsComponent } from './jobs/alljobs/alljobs.component';
import { SendmessageComponent } from './messages/sendmessage/sendmessage.component';
import { ViewmessagesComponent } from './messages/viewmessages/viewmessages.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      RegisterComponent,
      LoginComponent,
      DashboardComponent,
      PostjobComponent,
      UserjobsComponent,
      AlljobsComponent,
      SendmessageComponent,
      ViewmessagesComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
