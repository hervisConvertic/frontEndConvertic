import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutLoginComponent } from './modulos/layout/layout-login/layout-login.component';
import { LayoutHomeComponent } from './modulos/layout/layout-home/layout-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






@NgModule({
  declarations: [
    AppComponent,
    LayoutLoginComponent,
    LayoutHomeComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
