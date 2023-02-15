import { Component, OnInit } from '@angular/core';
import { ProductoTallaService } from '../../../servicios/producto-talla.service';

import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { map, Observable, flatMap } from 'rxjs';
import { Producto } from '../../../interface/producto-genero';



@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent implements OnInit {

  genero: string = 'hombre';
  myControl = new FormControl('');
  options!: Producto[];
  productosFiltrados!: Observable<Producto[]>;
  productoSeleccionado!: Producto | undefined;

  constructor(private productoTallaService: ProductoTallaService) { }

  ngOnInit() {
    this.productosFiltrados = this.myControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value && value),
        flatMap(value => value ? this._filter(value as string) : [])
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    console.log(filterValue);
    return this.productoTallaService.buscarPorItem(this.genero, filterValue);
  }

  seleccionProducto(event: MatAutocompleteActivatedEvent) {
    console.log(event);
    if (!event.option?.value) {
      this.productoSeleccionado = undefined;
      return
    }
  }
}
