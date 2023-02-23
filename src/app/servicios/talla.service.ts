import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Talla } from '../interface/talla';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TallaService {

  private urlEndPoint: string = 'http://localhost:8080/talla';

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  verTallas(): Observable<Talla[]> {
    return this.http.get<Talla[]>(this.urlEndPoint);
  }
}
