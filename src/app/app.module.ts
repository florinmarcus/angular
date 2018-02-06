import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './modules/material.module';
import { AppComponent } from './app.component';
import { ServerService } from './server.service';


@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
