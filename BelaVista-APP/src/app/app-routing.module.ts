import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondominiumComponent } from './condominium/condominium.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ContactComponent } from './contact/contact.component';
import { MeetingComponent } from './meeting/meeting.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { VisitantComponent } from './visitant/visitant.component';
import { WarningComponent } from './warning/warning.component';


const routes: Routes = [
  { path: 'condominium', component: CondominiumComponent },
  { path: 'complaint', component: ComplaintComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'meeting', component: MeetingComponent },
  { path: 'scheduling', component: SchedulingComponent },
  { path: 'visitant', component: VisitantComponent },
  { path: 'warning', component: WarningComponent },
  { path: '', redirectTo: 'condominium', pathMatch: 'full' },
  { path: '**', redirectTo: 'condominium', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
