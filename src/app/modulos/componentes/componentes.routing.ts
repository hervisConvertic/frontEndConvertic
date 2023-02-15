import { Route } from '@angular/router';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { BarraMenuComponent } from './barra-menu/barra-menu.component';

export const ComponentesRuta: Route[] = [
    { path: 'barra-menu', component: BarraMenuComponent },
    { path: 'barra-busqueda', component: BarraBusquedaComponent }

]