import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../app/shared/_guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/_header/header.component';
import { FooterComponent } from './shared/_footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { routing } from './routing';
import { DashboardService } from './dashboard/service/dashboard.service';
import { AuthenticationService } from './login/service/authentication.service';
import { RatingComponent } from './shared/_rating/rating.component';
import { FeedbackService } from './feedback/service/feedback.service';
import { SettingsService } from './settings/service/settings.service';
import { ReportsComponent } from './reports/reports.component';
import { ReportViewerComponent } from './shared/_reportviewer/reportviewer.component';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';


export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    SettingsComponent,
    FeedbackComponent,
    RatingComponent,
    ReportsComponent,
    ReportViewerComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        skipWhenExpired: true
      }
    }),
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },

    AuthGuard,
    AuthenticationService,
    DashboardService,
    FeedbackService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
