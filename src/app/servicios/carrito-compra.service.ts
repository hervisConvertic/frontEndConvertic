import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarritoCompra } from '../interface/carrito-compra';
import { NuevoProductoCarrito } from '../interface/nuevo-producto-carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoCompraService {

  private urlEndPoint: string = 'http://localhost:8080/carritoCompra';
  private urlEndPointEliminarPorIdUsuario: string = 'http://localhost:8080/carritoCompra/usuario';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) { }

  registrarProducto(carritoCompra: NuevoProductoCarrito): Observable<CarritoCompra> {
    return this.http.post<CarritoCompra>(this.urlEndPoint, carritoCompra, { headers: this.httpHeaders });
  }

  obtenerCarritoPorId(id: number): Observable<CarritoCompra[]> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.get<CarritoCompra[]>(url);
  }

  eliminarCarritoPorId(id: number): Observable<CarritoCompra> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.delete<CarritoCompra>(url, { headers: this.httpHeaders })
  }
  eliminarCarritoPorIdUsuario(id: number): Observable<CarritoCompra> {
    const url = `${this.urlEndPointEliminarPorIdUsuario}/${id}`;
    return this.http.delete<CarritoCompra>(url, { headers: this.httpHeaders })
  }

  actualizarInventarioPorCompraUsuario(id: number): Observable<CarritoCompra> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.patch<CarritoCompra>(url, { headers: this.httpHeaders })
  }

}
