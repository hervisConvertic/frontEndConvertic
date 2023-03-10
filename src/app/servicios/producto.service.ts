import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../interface/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEndPoint: string = 'http://localhost:8080/producto';
  private urlEndPointGenero: string = 'http://localhost:8080/producto/genero';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) { }

  actualizarBusqueda(id: number): Observable<Producto> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.patch<Producto>(url, { headers: this.httpHeaders });
  }

  verProductosMasBuscados(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  obtenerProductoPorGenero(genero: string): Observable<Producto[]> {
    const url = `${this.urlEndPointGenero}/${genero}`
    return this.http.get<Producto[]>(url);
  }
}
