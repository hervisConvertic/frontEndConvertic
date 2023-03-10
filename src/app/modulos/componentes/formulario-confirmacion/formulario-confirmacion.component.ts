import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ciudad } from '../../../interface/ciudad';
import { CiudadService } from '../../../servicios/ciudad.service';
import { DatosEnvioVentaService } from '../../../servicios/datos-envio-venta.service';
import { AuthService } from '../../../servicios/auth.service';
import { Usuario } from '../../../interface/usuario';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-formulario-confirmacion',
  templateUrl: './formulario-confirmacion.component.html',
  styleUrls: ['./formulario-confirmacion.component.css']
})
export class FormularioConfirmacionComponent implements OnInit {

  ciudades!: Ciudad[];
  usuarioLogueado!: Usuario;

  miFormularioEmergente: FormGroup = this.formBuilder.group({
    fecha: [new Date().toISOString().substring(0, 10), [Validators.required]],
    ciudad: [''],
    direccion: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
  });

  constructor(private _ciudadService: CiudadService,
    private _datosEnvioVentaService: DatosEnvioVentaService,
    private _authService: AuthService,
    public dialogRef: MatDialogRef<FormularioConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._ciudadService.obtenerCiudad().subscribe(
      ciudades => {
        this.ciudades = ciudades;

        this.miFormularioEmergente.controls['ciudad'].setValue(this.ciudades[0]);
      }
    );
    const correoUsuarioActual = localStorage.getItem('correo');
    if (correoUsuarioActual !== null) {
      this._authService.obtenerUsuarioPorCorreo(correoUsuarioActual)
        .subscribe((item => {
          console.log(item);
          this.usuarioLogueado = item;
          console.log("este es el usuario logueado: " + this.usuarioLogueado)
        }))
    }
  }

  campoEmergenteEsValido(campoEmergente: string, validacion: string):
    boolean {
    return this.miFormularioEmergente.controls[campoEmergente].errors?.[
      validacion] && this.miFormularioEmergente.controls[campoEmergente].touched;
  }

  public formularioEmergente(): void {
    if (this.miFormularioEmergente.invalid) {
      this.miFormularioEmergente.markAllAsTouched();
      return;
    }
    console.log("imprimiendo formulario emergente")

    console.log(this.miFormularioEmergente);

    if (this.miFormularioEmergente.valid) {

      console.log("el formulario fue valido");
      this.dialogRef.close();
      console.log(this.miFormularioEmergente.value);
      //agregando el objeto usuario al objeto miFormularioEmergente.value
      this.miFormularioEmergente.value.usuario = this.usuarioLogueado;
      console.log(this.miFormularioEmergente.value);

      this._datosEnvioVentaService.registrarDatosEnvioVenta(
        this.miFormularioEmergente.value).subscribe(
          result => {
            console.log(result);
          }
        );
      Swal.fire({
        title: 'Gracias por su compra, hemos enviado un correo electronico con los detalles de envio',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'

        }

      })
      console.log("saliendo de la compra");
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }

}



