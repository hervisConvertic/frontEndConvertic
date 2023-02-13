import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraMenuComponent } from './barra-menu/barra-menu.component';
import { RouterModule } from '@angular/router';
import { ComponentesRuta } from './componentes.routing';



@NgModule({
  declarations: [
    BarraMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentesRuta)
  ]
})
export class ComponenteModule { }
