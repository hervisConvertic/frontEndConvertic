import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraMenuComponent } from './barra-menu/barra-menu.component';
import { RouterModule } from '@angular/router';
import { ComponentesRuta } from './componentes.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    BarraMenuComponent,
    BarraBusquedaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentesRuta),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ComponenteModule { }
