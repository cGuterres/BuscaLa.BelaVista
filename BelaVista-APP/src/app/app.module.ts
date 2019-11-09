import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule, BsDropdownModule, ModalModule, BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';

import { CondominiumService } from './_services/Condominium.service';
import { AuthService } from './_services/AuthService.service';

import { DateTimeFormatPipePipe } from './_helper/DateTimeFormatPipe.pipe';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CondominiumComponent } from './condominium/condominium.component';
import { WarningComponent } from './warning/warning.component';
import { ContactComponent } from './contact/contact.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { MeetingComponent } from './meeting/meeting.component';
import { VisitantComponent } from './visitant/visitant.component';
import { TitleComponent } from './_shared/title/title.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { CondominiumEditComponent } from './condominium/condominium-edit/condominium-edit.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { WarningService } from './_services/Warning.service';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      CondominiumComponent,
      CondominiumEditComponent,
      DateTimeFormatPipePipe,
      WarningComponent,
      ContactComponent,
      SchedulingComponent,
      ComplaintComponent,
      MeetingComponent,
      VisitantComponent,
      TitleComponent,
      UserComponent,
      LoginComponent,
      RegistrationComponent
   ],
   imports: [
      BrowserModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      TabsModule.forRoot(),
      ToastrModule.forRoot({
         timeOut: 2100,
         positionClass: 'toast-bottom-right',
         preventDuplicates: true,
         progressBar: true
       }),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      NgxMaskModule
   ],
   providers: [
      WarningService,
      CondominiumService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
