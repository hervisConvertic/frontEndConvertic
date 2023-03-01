import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../servicios/auth.service';
import { Router } from '@angular/router';
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service';
import { TipoDocumento } from '../../../interface/tipo-documento';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  documentos!: TipoDocumento[];


  miFormularioRegistro!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private tipoDocumentoService: TipoDocumentoService,
    private router: Router
  ) {
    this.miFormularioRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      tipoDocumento: [''],
      documento: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/)
      ]),
      confirmacionContrasena: ['']
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tipoDocumentoService.getTiposDocumento().subscribe(documentos => this.documentos = documentos)
  }

  campoRegistroEsValido(campoRegistro: string, validacion: string):
    boolean {
    return this.miFormularioRegistro.controls[campoRegistro].errors?.[
      validacion] && this.miFormularioRegistro.controls[campoRegistro].touched;
  }

  public registro(): void {
    console.log(this.miFormularioRegistro.controls['contrasena']);
    //console.log(this.miFormularioRegistro);
    if (this.miFormularioRegistro.invalid) {
      this.miFormularioRegistro.markAllAsTouched();
      return;
    }

    this.authService.registro(this.miFormularioRegistro.value).subscribe(
      (response: any) => {

        console.log(response);
        if (response.status === "success") {
          console.log('Usuario registrado correctamente');
          this.router.navigate(['/login'])
        } else {
          console.log('Error al iniciar sesion: ' + response.message);
        }
      },
      //error
      (error) => {
        console.log('error al iniciar sesion ' + error);
      }
    );
    console.log(this.miFormularioRegistro.value);
  }

}
