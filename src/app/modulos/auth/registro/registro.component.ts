import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../servicios/auth.service';
import { Router } from '@angular/router';
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service';
import { TipoDocumento } from '../../../interface/tipo-documento';
import Swal from 'sweetalert2';


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
      confirmacionContrasena: new FormControl('', [
        Validators.required
      ])
    }
    );
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tipoDocumentoService.getTiposDocumento().subscribe(documentos => {
      this.documentos = documentos;
      this.miFormularioRegistro.controls['tipoDocumento'].setValue(this.documentos[0]);
    });

    const miCorreo = localStorage.getItem('correo');
    console.log("obtniendo correo desde el login: " + miCorreo);
  }

  campoRegistroEsValido(campoRegistro: string, validacion: string):
    boolean {
    return this.miFormularioRegistro.controls[campoRegistro].errors?.[
      validacion] && this.miFormularioRegistro.controls[campoRegistro].touched;
  }

  public registro(): void {
    //console.log(this.miFormularioRegistro.controls['contrasena']);
    //console.log(this.miFormularioRegistro.controls['confirmacionContrasena']);
    const contrasena = this.miFormularioRegistro.get('contrasena')?.value;
    const confirmacionContrasena = this.miFormularioRegistro.get('confirmacionContrasena')?.value;

    if (contrasena !== confirmacionContrasena) {
      this.miFormularioRegistro.get('confirmacionContrasena')?.setErrors({ 'noCoincideContrasena': true });
      return;
    }

    if (this.miFormularioRegistro.invalid) {
      this.miFormularioRegistro.markAllAsTouched();
      return;
    }

    this.authService.registro(this.miFormularioRegistro.value).subscribe(
      usuario => {
        this.router.navigate(['/barra-menu'])
        Swal.fire('Nuevo usuario', `Usuario ${usuario.nombre} ${usuario.apellido} creado con exito!`, 'success')
      }
    )
  }
}
