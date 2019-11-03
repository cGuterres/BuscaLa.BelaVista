import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondominiumComponent } from './condominium/condominium.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ContactComponent } from './contact/contact.component';
import { MeetingComponent } from './meeting/meeting.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { VisitantComponent } from './visitant/visitant.component';
import { WarningComponent } from './warning/warning.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'user', component: UserComponent,
   children: [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent }
   ]
},
  { path: 'condominium', component: CondominiumComponent, canActivate: [AuthGuard] },
  { path: 'complaint', component: ComplaintComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'meeting', component: MeetingComponent, canActivate: [AuthGuard] },
  { path: 'scheduling', component: SchedulingComponent, canActivate: [AuthGuard] },
  { path: 'visitant', component: VisitantComponent, canActivate: [AuthGuard] },
  { path: 'warning', component: WarningComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'condominium', pathMatch: 'full' },
  { path: '**', redirectTo: 'condominium', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
