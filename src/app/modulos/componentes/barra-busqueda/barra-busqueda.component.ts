import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductoTallaService } from '../../../servicios/producto-talla.service';
import { Subject, debounceTime } from 'rxjs';
import { Producto } from 'src/app/interface/producto';


@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebunce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  genero: string = '';
  termino: string = '';
  hayError: boolean = false;
  productosSugerido: Producto[] = [];

  constructor(private productoTallaService: ProductoTallaService) { }

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(valor => {
        this.onDebunce.emit(valor);
      });
  }

  buscarProducto(): void {
    this.onEnter.emit(this.termino);

  }
  teclaPresionada() {
    this.debouncer.next(this.termino);
    console.log("estoy en tecla presionada")

  }
}




