import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DatosEnvioVenta } from '../interface/datos-envio-venta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosEnvioVentaService {
  private urlEndPoint: string = 'http://localhost:8080/datosEnvioVenta';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })

  constructor(private http: HttpClient) { }

  registrarDatosEnvioVenta(datosEnvioVenta: DatosEnvioVenta): Observable<DatosEnvioVenta> {
    return this.http.post<DatosEnvioVenta>(this.urlEndPoint, datosEnvioVenta, { headers: this.httpHeaders });
  }
}
