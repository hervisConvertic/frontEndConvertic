import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutLoginComponent } from './modulos/layout/layout-login/layout-login.component';
import { LayoutHomeComponent } from './modulos/layout/layout-home/layout-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarraMenuComponent } from './modulos/componentes/barra-menu/barra-menu.component';
import { BarraBusquedaComponent } from './modulos/componentes/barra-busqueda/barra-busqueda.component';
import { FormsModule } from '@angular/forms';
import { ProductoBuscadoComponent } from './modulos/componentes/producto-buscado/producto-buscado.component';







@NgModule({
  declarations: [
    AppComponent,
    LayoutLoginComponent,
    LayoutHomeComponent,
    BarraMenuComponent,
    BarraBusquedaComponent,
    ProductoBuscadoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
