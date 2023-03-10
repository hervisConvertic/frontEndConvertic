import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interface/producto-genero';
import { ProductoService } from '../../../servicios/producto.service';


@Component({
  selector: 'app-productos-mas-buscados',
  templateUrl: './productos-mas-buscados.component.html',
  styleUrls: ['./productos-mas-buscados.component.css']
})
export class ProductosMasBuscadosComponent implements OnInit {

  public coloresBotones = ["#00FF7F", "#DAA520", "#4169E1", "#9932CC"];

  secuencia: number[] = [];
  producto!: Producto[];

  constructor(private _productoService: ProductoService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._productoService.verProductosMasBuscados()
      .subscribe(producto => {
        this.producto = producto;

        //se crea copia del arreglo de colores disponibles
        let coloresDisponibles = [...this.coloresBotones];
        //Escogemos un secuencia aleatoria de colores para cada producto
        this.secuencia = this.producto.map(() => {
          const index = Math.floor(Math.random() * coloresDisponibles.length);
          const color = coloresDisponibles[index];
          //Eliminamos el color de la lista de colores disponibles
          coloresDisponibles.splice(index, 1);

          const colorIndex = this.coloresBotones.indexOf(color);

          return colorIndex;
        })
      });

  }


}


