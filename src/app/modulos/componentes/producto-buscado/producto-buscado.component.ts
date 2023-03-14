import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/interface/producto';


@Component({
  selector: 'app-producto-buscado',
  templateUrl: './producto-buscado.component.html',
  styleUrls: ['./producto-buscado.component.css']
})
export class ProductoBuscadoComponent implements OnInit {

  @Output() onCerrarHome: EventEmitter<boolean> = new EventEmitter();
  @Input() productoSeleccionado: Producto[] = [];
  @Input() productoPorGenero: Producto[] = [];

  public cardGenero = true;

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  public cerrarHome(): void {
    this.cardGenero = false;
    this.onCerrarHome.emit(this.cardGenero);
  }

}
