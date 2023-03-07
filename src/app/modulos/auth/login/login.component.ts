import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  expresionContrasena: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$";

  miFormularioLogin: FormGroup = this.formBuilder.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  campoLoginEsValido(campoLogin: string, validacion: string):
    boolean {
    return this.miFormularioLogin.controls[campoLogin].errors?.[
      validacion] && this.miFormularioLogin.controls[campoLogin].touched;
  }

  public login(): void {

    if (this.miFormularioLogin.invalid) {
      this.miFormularioLogin.markAllAsTouched();
      return;
    }

    this.authService.login(this.miFormularioLogin.value).subscribe(
      response => {
        const confirmarCorreo = /\S+@\S+\.\S+/;
        const emailMatch = response.correo.match(confirmarCorreo);
        if (emailMatch !== null) {
          localStorage.setItem('correo', emailMatch[0]);
        }
        this.router.navigate(['/barra-menu'])
        Swal.fire('Login usuario', `Usuario ${response.correo} logueado con exito!`, 'success')
      }
    );
    console.log(this.miFormularioLogin.value);
    //this.miFormularioLogin.reset();
  }
}
