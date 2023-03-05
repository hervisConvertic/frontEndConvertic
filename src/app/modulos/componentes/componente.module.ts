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
import { ProductoBuscadoComponent } from './producto-buscado/producto-buscado.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { ProductosMasBuscadosComponent } from './productos-mas-buscados/productos-mas-buscados.component';
import { CarritoCompraComponent } from './carrito-compra/carrito-compra.component';
import { FormularioConfirmacionComponent } from './formulario-confirmacion/formulario-confirmacion.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    BarraMenuComponent,
    BarraBusquedaComponent,
    ProductoBuscadoComponent,
    VerProductoComponent,
    ProductosMasBuscadosComponent,
    CarritoCompraComponent,
    FormularioConfirmacionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentesRuta),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class ComponenteModule { }
