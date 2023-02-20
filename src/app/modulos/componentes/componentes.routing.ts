import { Route } from '@angular/router';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { BarraMenuComponent } from './barra-menu/barra-menu.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { ProductoBuscadoComponent } from './producto-buscado/producto-buscado.component';
import { ProductosMasBuscadosComponent } from './productos-mas-buscados/productos-mas-buscados.component';

export const ComponentesRuta: Route[] = [
    { path: 'barra-menu', component: BarraMenuComponent },
    { path: 'barra-busqueda', component: BarraBusquedaComponent },
    { path: 'verProducto/:id', component: VerProductoComponent },
    { path: 'productoBuscado', component: ProductoBuscadoComponent },
    { path: 'verProductosMasBuscados', component: ProductosMasBuscadosComponent }

]