import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule, BsDropdownModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';

import { CondominiumService } from './_services/Condominium.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CondominiumComponent } from './condominium/condominium.component';

import { DateTimeFormatPipePipe } from './_helper/DateTimeFormatPipe.pipe';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      CondominiumComponent,
      DateTimeFormatPipePipe
   ],
   imports: [
      BrowserModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [
      CondominiumService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
