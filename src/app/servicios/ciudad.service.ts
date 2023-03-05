import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../interface/ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private urlEndPoint: string = 'http://localhost:8080/ciudad';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })

  constructor(private http: HttpClient) { }

  obtenerCiudad(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.urlEndPoint);
  }
}
