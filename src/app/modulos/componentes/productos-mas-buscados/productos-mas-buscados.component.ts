import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interface/producto-genero';
import { ProductoService } from '../../../servicios/producto.service';

@Component({
  selector: 'app-productos-mas-buscados',
  templateUrl: './productos-mas-buscados.component.html',
  styleUrls: ['./productos-mas-buscados.component.css']
})
export class ProductosMasBuscadosComponent implements OnInit {

  producto!: Producto[];

  constructor(private _productoService: ProductoService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._productoService.verProductosMasBuscados()
      .subscribe(producto => {
        this.producto = producto;
      });
    localStorage.setItem('nombre', 'hervis');

    const product = {
      'nombre': 'monitor de 24 pulgadas',
      'precio': 300
    }
    const productString = JSON.stringify(product);
    console.log(productString);
    localStorage.setItem('product', productString);
    console.log(product);


  }

}
