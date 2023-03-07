import { Component, OnInit } from '@angular/core';
import { ProductoTallaService } from '../../../servicios/producto-talla.service';
import { ProductoGenero } from '../../../interface/producto-genero';
import { Producto } from 'src/app/interface/producto';
import { AuthService } from '../../../servicios/auth.service';
import { Usuario } from '../../../interface/usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css']
})
export class BarraMenuComponent implements OnInit {
  /** Propiedad que indica si hay alguien autenticado */
  public estaAutenticado: boolean = false;
  /**nombre del usuario que esta logueado actualmente */
  usuarioActual: string = "";
  /**Datos del usuario que esta logueado actualmente */
  usuarioLogueado!: Usuario;

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

  constructor(private productoTallaService: ProductoTallaService,
    private _authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.obtenerGenero();

    const correoUsuarioActual = localStorage.getItem('correo');
    if (correoUsuarioActual !== null) {
      this._authService.obtenerUsuarioPorCorreo(correoUsuarioActual)
        .subscribe((item => {
          console.log(item);
          this.usuarioLogueado = item;
          console.log("este es el usuario logueado: " + this.usuarioLogueado.nombre)
          this.usuarioActual = this.usuarioLogueado.nombre;
        }))
      this.estaAutenticado = true;
    }
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

  onCerrarSesion() {
    console.log("estoy en cerrar sesion");
    localStorage.removeItem('correo')
    this.estaAutenticado = false;
    this.router.navigate(['/auth/login']);

  }

  onIniciarSesion() {
    console.log("estoy en iniciar seseion")
    this.router.navigate(['/auth/login']);
  }


}
