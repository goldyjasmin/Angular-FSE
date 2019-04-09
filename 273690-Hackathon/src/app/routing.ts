import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedbackComponent } from '../app/feedback/feedback.component';

import { AuthGuard } from '../app/shared/_guards/auth.guard';
import { ReportsComponent } from './reports/reports.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'feedback/:userType/:userId/:eventId', component: FeedbackComponent },
  {
    path: 'dashboard',
    component: DashboardComponent, canActivate: [AuthGuard]
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }, //, canActivate: [AuthGuard] 
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  // otherwise redirect to login
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
