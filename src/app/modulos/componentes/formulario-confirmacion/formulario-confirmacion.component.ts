import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ciudad } from '../../../interface/ciudad';
import { CiudadService } from '../../../servicios/ciudad.service';



@Component({
  selector: 'app-formulario-confirmacion',
  templateUrl: './formulario-confirmacion.component.html',
  styleUrls: ['./formulario-confirmacion.component.css']
})
export class FormularioConfirmacionComponent implements OnInit {

  ciudades!: Ciudad[];

  miFormularioEmergente: FormGroup = this.formBuilder.group({
    fecha: [new Date().toISOString().substring(0, 10), [Validators.required]],
    ciudad: [''],
    direccion: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
  });

  constructor(private _ciudadService: CiudadService,
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
  }

  campoEmergenteEsValido(campoEmergente: string, validacion: string):
    boolean {
    return this.miFormularioEmergente.controls[campoEmergente].errors?.[
      validacion] && this.miFormularioEmergente.controls[campoEmergente].touched;
  }

  public formularioEmergente(): void {
    console.log("imprimiendo formulario emergente")
    console.log(this.miFormularioEmergente.value);
    console.log(this.miFormularioEmergente);

    if (this.miFormularioEmergente.valid) {
      console.log("el formulario fue valido");
      this.dialogRef.close();
    }

  }

  onNoClick() {
    this.dialogRef.close();
  }
}
