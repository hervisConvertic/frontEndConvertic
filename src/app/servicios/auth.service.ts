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

  private configuracionSesion: string = 'usuarioLogueado';

  constructor(private http: HttpClient) { }

  registro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPoint, usuario, { headers: this.httpHeaders })
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPointLogin, usuario, { headers: this.httpHeaders });
  }
  set sesion(auth: Usuario) {
    localStorage.setItem(this.configuracionSesion, JSON.stringify(auth));
  }
  get sesion(): Usuario {
    if (localStorage.getItem(this.configuracionSesion) === undefined) {

    }
    const sesionJson = localStorage.getItem(this.configuracionSesion);
    const sesion: Usuario = sesionJson !== null ? JSON.parse(sesionJson) : null;
    return sesion;
  }

  cerrarSesion() {
    localStorage.removeItem(this.configuracionSesion);
    return of(true);
  }
}
