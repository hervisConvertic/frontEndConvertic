import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutLoginComponent } from './modulos/layout/layout-login/layout-login.component';
import { LayoutHomeComponent } from './modulos/layout/layout-home/layout-home.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LayoutLoginComponent,
    children: [
      { path: '', loadChildren: () => import('src/app/modulos/auth/auth.module').then(m => m.AuthModule) },

    ]
  },
  {
    path: '',
    component: LayoutHomeComponent,
    children: [
      { path: '', loadChildren: () => import('src/app/modulos/componentes/componente.module').then(m => m.ComponenteModule) }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
