import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule, BsDropdownModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { CondominiumService } from './_services/Condominium.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CondominiumComponent } from './condominium/condominium.component';

import { DateTimeFormatPipePipe } from './_helper/DateTimeFormatPipe.pipe';
import { WarningComponent } from './warning/warning.component';
import { ContactComponent } from './contact/contact.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { MeetingComponent } from './meeting/meeting.component';
import { VisitantComponent } from './visitant/visitant.component';
import { TitleComponent } from './_shared/title/title.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      CondominiumComponent,
      DateTimeFormatPipePipe,
      WarningComponent,
      ContactComponent,
      SchedulingComponent,
      ComplaintComponent,
      MeetingComponent,
      VisitantComponent,
      TitleComponent
   ],
   imports: [
      BrowserModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      ToastrModule.forRoot({
         timeOut: 1500,
         positionClass: 'toast-bottom-right',
         preventDuplicates: true,
       }),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule
   ],
   providers: [
      CondominiumService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
