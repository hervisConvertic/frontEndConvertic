import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProductoTallaService } from '../../../servicios/producto-talla.service';
import { Producto } from '../../../interface/producto-genero';
import { ProductoService } from '../../../servicios/producto.service';
import { Talla } from '../../../interface/talla';
import { TallaService } from '../../../servicios/talla.service';
import { ProductoTalla } from '../../../interface/producto-talla';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  productoTalla!: ProductoTalla;
  producto!: Producto;
  actualizarProducto!: Producto;
  tallas!: Talla[];
  tallaSeleccionada!: Talla;


  constructor(private activatedRoute: ActivatedRoute,
    private productoTallaService: ProductoTallaService,
    private _productoService: ProductoService,
    private _tallaService: TallaService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.productoTallaService.obtenerProductoTallaPorId(id)),
        tap(console.log)
      )
      .subscribe(producto => {
        this.productoTalla = producto;
        this._tallaService.verTallas()
          .subscribe(tallas => {
            // this.tallas = tallas.filter(talla => talla.id
            //   === this.productoTalla.talla.id);
            // if (this.tallas.length > 0) {
            //   this.tallaSeleccionada = this.tallas[0];
            // }
            // this.actualizarTalla();
            this.tallas = tallas;
          })
      });

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._productoService.actualizarBusqueda(id)),
        tap(console.log)
      )
      .subscribe(producto => {
        this.actualizarProducto = producto;
      });

  }

  actualizarTalla(): void {
    console.log("inicio");
    console.log(this.tallaSeleccionada)
    console.log("id producto");
    console.log(this.productoTalla.producto.id);
  }
}