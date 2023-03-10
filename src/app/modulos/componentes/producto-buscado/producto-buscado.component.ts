import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/interface/producto';


@Component({
  selector: 'app-producto-buscado',
  templateUrl: './producto-buscado.component.html',
  styleUrls: ['./producto-buscado.component.css']
})
export class ProductoBuscadoComponent implements OnInit {

  @Input() productoSeleccionado: Producto[] = [];
  @Input() productoPorGenero: Producto[] = [];

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

}
