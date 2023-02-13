import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthRutas } from './auth.routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRutas),
    ReactiveFormsModule


  ]
})
export class AuthModule { }
