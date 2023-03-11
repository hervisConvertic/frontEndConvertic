import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { CarritoCompra } from '../../../interface/carrito-compra';
import { Usuario } from '../../../interface/usuario';
import { CarritoCompraService } from '../../../servicios/carrito-compra.service';
import Swal from 'sweetalert2';
import { FormularioConfirmacionComponent } from '../formulario-confirmacion/formulario-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent implements OnInit {

  hayError: boolean = false;
  productoCarrito: CarritoCompra[] = [];
  usuarioLogueado!: Usuario;
  idUsuarioActual!: number;

  constructor(private _authService: AuthService,
    private _carritoCompraService: CarritoCompraService,
    public dialogo: MatDialog
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const correoUsuarioActual = localStorage.getItem('correo');
    if (correoUsuarioActual !== null) {
      this._authService.obtenerUsuarioPorCorreo(correoUsuarioActual)
        .subscribe((item => {
          console.log(item);
          this.usuarioLogueado = item;
          console.log("este es el usuario logueado: " + this.usuarioLogueado.id)
          this.idUsuarioActual = this.usuarioLogueado.id;
          console.log(this.idUsuarioActual);
          //funcion
          this.obtenerCarrito(this.idUsuarioActual);
        }))

    }
  }

  obtenerCarrito(id: number): void {
    console.log("estoy aqui en el metodo" + id);
    this._carritoCompraService.obtenerCarritoPorId(id)
      .subscribe(item => {
        console.log(item);
        this.productoCarrito = item;
        console.log("probando id" + this.productoCarrito);
      }, (error) => {
        this.hayError = true;
      })
  }

  // para eliminar productos del carrito
  eliminarProducto(carrito: CarritoCompra) {

    Swal.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar el producto ${carrito.productoTalla.producto.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {

        this._carritoCompraService.eliminarCarritoPorId(carrito.id)
          .subscribe(
            respose => {
              this.productoCarrito = this.productoCarrito
                .filter(c => c !== carrito)
            }
          )

        Swal.fire(
          'Producto Eliminado!',
          `Producto ${carrito.productoTalla.producto.descripcion} eliminado con éxito.`,
          'success'
        )
      }
    })
  }

  // para obtener el total de la compra
  obtenerTotal() {
    let total = 0;
    if (Array.isArray(this.productoCarrito)) {
      for (const item of this.productoCarrito) {
        total += item.productoTalla.producto.precio * item.cantidad;
      }
    }
    return total;
  }

  realizarCompra() {
    console.log('realizar compra')
    this.abrirDialogo();
  }

  abrirDialogo() {
    const dialogoReferencia = this.dialogo.open(FormularioConfirmacionComponent);
    dialogoReferencia.afterClosed().subscribe(result => {
      console.log(`Dialogo result: ${result}`);

    });
  }

}
