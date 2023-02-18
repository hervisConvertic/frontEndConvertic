import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProductoTallaService } from '../../../servicios/producto-talla.service';
import { Producto } from '../../../interface/producto-genero';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  producto!: Producto;

  constructor(private activatedRoute: ActivatedRoute,
    private productoTallaService: ProductoTallaService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.productoTallaService.buscarPorId(id)),
        tap(console.log)
      )
      .subscribe(producto => {
        this.producto = producto;
      });
  }

}
