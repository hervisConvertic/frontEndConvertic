import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProductoTallaService } from '../../../servicios/producto-talla.service';
import { CarritoCompraService } from '../../../servicios/carrito-compra.service';
import { Producto } from '../../../interface/producto-genero';
import { ProductoService } from '../../../servicios/producto.service';
import { Talla } from '../../../interface/talla';
import { TallaService } from '../../../servicios/talla.service';
import { ProductoTalla } from '../../../interface/producto-talla';
import { CarritoCompra } from '../../../interface/carrito-compra';
import { NuevoProductoCarrito } from '../../../interface/nuevo-producto-carrito';
import { AuthService } from '../../../servicios/auth.service';
import { Usuario } from '../../../interface/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  @Output() onTallaServicio: EventEmitter<ProductoTalla[]> = new EventEmitter;

  public coloresBotones = ["#00FF7F", "#DAA520", "#4169E1", "#9932CC"];

  productoTallaSeleccionado!: ProductoTalla;
  //cantidad ingresada
  cantidad: number = 0;

  producto!: Producto;
  actualizarProducto!: Producto;
  tallas!: Talla[];
  tallaSeleccionada!: Talla;
  usuarioLogueado!: Usuario;
  usuario!: Usuario;

  constructor(private activatedRoute: ActivatedRoute,
    private productoTallaService: ProductoTallaService,
    private _productoService: ProductoService,
    private _tallaService: TallaService,
    private _carritoCompraService: CarritoCompraService,
    private _authService: AuthService
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
        this._tallaService.verTallas()
          .subscribe(tallas => {
            this.tallas = tallas;

            if (this.tallas.length > 0) {
              this.tallaSeleccionada = this.tallas[0];
              this.actualizarTalla();
            }
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

    const correoUsuarioActual = localStorage.getItem('correo');
    if (correoUsuarioActual !== null) {
      this._authService.obtenerUsuarioPorCorreo(correoUsuarioActual)
        .subscribe((item => {
          console.log(item);
          this.usuarioLogueado = item;
        }))
    }
  }

  actualizarTalla(): void {
    console.log(this.tallaSeleccionada)
    console.log(this.producto.id);
    this.productoTallaService.obtenerCantidadPorId(
      this.producto.id, this.tallaSeleccionada.id
    ).subscribe(producto => {
      this.productoTallaSeleccionado = producto
      console.log(producto);
    });
  }

  //enviar producto al carrito
  enviarProducto(): void {
    if (this.cantidad <= 0) {

      return;
    }
    if (this.productoTallaSeleccionado.stock >= this.cantidad) {

      let usuario = { usuario: this.usuarioLogueado }
      console.log(usuario);
      let cantidad = { cantidad: this.cantidad }
      console.log(cantidad);
      console.log(this.productoTallaSeleccionado);
      console.log(this.usuarioLogueado);

      let objetoCombinado: NuevoProductoCarrito = {
        usuario: this.usuarioLogueado,
        productoTalla: this.productoTallaSeleccionado,
        cantidad: cantidad.cantidad,
      };
      console.log(objetoCombinado);

      this._carritoCompraService.registrarProducto(objetoCombinado)
        .subscribe(result => {
          console.log(result);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto se ha enviado al carrito de compras',
            showConfirmButton: false,
            timer: 1500
          })
        });

    } else {
      Swal.fire(
        'Lo sentimos!',
        // 'La cantidad solicitada no esta disponible.',
        `La cantidad solicitada no esta disponible, solo tenemos ${this.productoTallaSeleccionado.stock} ${this.producto.descripcion}s en el inventario.`,
        'warning'
      )
      console.log("la cantidad ingresada no esta disponible en el inventario");
    }

  }
}