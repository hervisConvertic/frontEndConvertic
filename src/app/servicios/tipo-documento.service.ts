import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../interface/tipo-documento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private urlEndPointTipoDocumento: string = 'http://localhost:8080/tipoDocumento';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })

  constructor(private http: HttpClient) { }

  getTiposDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(this.urlEndPointTipoDocumento);
  }
}
