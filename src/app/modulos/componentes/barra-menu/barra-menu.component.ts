import { Component, OnInit } from '@angular/core';
import { ProductoTallaService } from '../../../servicios/producto-talla.service';
import { ProductoGenero } from '../../../interface/producto-genero';
import { Producto } from 'src/app/interface/producto';

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css']
})
export class BarraMenuComponent implements OnInit {



  termino: string = '';
  seleccionGenero = 'hombre';
  opciones = [
    { genero: 'Ropa de Hombre', value: 'hombre' },
    { genero: 'Ropa de Mujer', value: 'mujer' }
  ];

  hayError: boolean = false;
  productos: ProductoGenero[] = [];
  itemProducto: Producto[] = [];
  productosSugerido: Producto[] = [];

  constructor(private productoTallaService: ProductoTallaService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.obtenerGenero();
  }

  public obtenerGenero(): void {
    console.log(this.seleccionGenero);

    this.termino = "";
    this.productoTallaService.buscarPorGenero(this.seleccionGenero)
      .subscribe(productos => {
        console.log(productos);
        this.productos = productos;

      }, (error) => {
        this.hayError = true;
      });
  }

  buscarProducto(termino: string) {
    this.hayError = false;
    this.termino = termino;

    this.productoTallaService.buscarPorItem(this.seleccionGenero, termino)
      .subscribe((item) => {
        console.log(item);
        this.itemProducto = item;
      },
        (error) => {
          this.hayError = true;
          this.itemProducto = [];
        });
  }

  sugerencias(termino: string) {
    if (termino == '') {
    } else {
      this.hayError = false;
      this.productoTallaService.buscarPorItem(this.seleccionGenero, termino)
        .subscribe(
          producto => this.productosSugerido = producto,
          (err) => this.productosSugerido = []
        );
      console.log("estoy aqui en sugerencias");
    }
  }
}
