import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interface/usuario';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlEndPoint: string = 'http://localhost:8080/usuario';
  private urlEndPointLogin: string = 'http://localhost:8080/usuario/login-request';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) { }

  registro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPoint, usuario, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error al registrar al usuario', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPointLogin, usuario, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Usuario no puede ingresar', e.error.mensaje, 'warning');
        return throwError(e);
      })
    )
  }

  obtenerUsuarioPorCorreo(correo: string): Observable<Usuario> {
    const url = `${this.urlEndPoint}/${correo}`;
    return this.http.get<Usuario>(url);
  }
}
