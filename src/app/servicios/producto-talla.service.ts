import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoGenero } from '../interface/producto-genero';
import { Producto } from '../interface/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoTallaService {
  private urlProductoGenero: string = 'http://localhost:8080/productoTalla';
  private urlBusquedaPorItems: string = 'http://localhost:8080/producto';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) { }

  buscarPorGenero(genero: string): Observable<ProductoGenero[]> {
    const url = `${this.urlProductoGenero}/${genero}`;
    return this.http.get<ProductoGenero[]>(url);
  }

  buscarPorItem(genero: string, termino: string): Observable<Producto[]> {
    const url = `${this.urlBusquedaPorItems}/${genero}/${termino}`;
    return this.http.get<Producto[]>(url);
  }
  buscarPorId(id: number): Observable<Producto> {
    const url = `${this.urlBusquedaPorItems}/${id}`;
    return this.http.get<Producto>(url);
  }
}
