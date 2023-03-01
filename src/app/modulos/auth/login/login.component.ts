import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';



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

      (response: any) => {
        console.log('Respuesta del servidor: ', response);
        console.log('Correo electrónico: ', response);

        const emailRegex = /\S+@\S+\.\S+/;
        const emailMatch = response.correo_electronico.match(emailRegex);
        console.log(emailMatch)
        if (emailMatch !== null) {

          console.log("bienvenido usted se ha logueado correctamente");
          console.log('Correo electrónico: ' + emailMatch[0]);
          localStorage.setItem('correo', emailMatch[0]);
          const miCorreo = localStorage.getItem('correo');
          console.log("este es el correo ingresado: " + miCorreo);

        } else {
          console.log('error al iniciar sesion: ' + response.message);
        }


        // Manejar el correo electrónico aquí
      },
      //  error
      (error) => {
        console.log('Error al iniciar sesión: ' + error);
      }
    );
    console.log(this.miFormularioLogin.value);
    //this.miFormularioLogin.reset();
  }
}
