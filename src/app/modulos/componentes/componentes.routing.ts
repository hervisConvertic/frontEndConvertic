import { Route } from '@angular/router';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { BarraMenuComponent } from './barra-menu/barra-menu.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { ProductoBuscadoComponent } from './producto-buscado/producto-buscado.component';
import { ProductosMasBuscadosComponent } from './productos-mas-buscados/productos-mas-buscados.component';
import { CarritoCompraComponent } from './carrito-compra/carrito-compra.component';
import { VerImagenComponent } from './ver-imagen/ver-imagen.component';

export const ComponentesRuta: Route[] = [
    { path: 'barra-menu', component: BarraMenuComponent },
    { path: 'barra-busqueda', component: BarraBusquedaComponent },
    { path: 'verProducto/:id', component: VerProductoComponent },
    { path: 'productoBuscado', component: ProductoBuscadoComponent },
    { path: 'verProductosMasBuscados', component: ProductosMasBuscadosComponent },
    { path: 'carritoCompras', component: CarritoCompraComponent },
    { path: 'imagenFondo', component: VerImagenComponent }

]