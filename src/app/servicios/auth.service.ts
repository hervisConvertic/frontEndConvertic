import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interface/usuario';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlEndPoint: string = 'http://localhost:8080/usuario';
  private urlEndPointLogin: string = 'http://localhost:8080/usuario/login-request';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) { }

  registro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPoint, usuario, { headers: this.httpHeaders })
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPointLogin, usuario, { headers: this.httpHeaders });
  }

  obtenerUsuarioPorCorreo(correo: string): Observable<Usuario> {
    const url = `${this.urlEndPoint}/${correo}`;
    return this.http.get<Usuario>(url);
  }


}
