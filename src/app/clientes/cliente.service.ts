
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient  } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable()
export class ClienteService {
  private urlEndPoint: string = environment.urlService + 'clientes';


  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje){
          console.log(e.error.mensaje)
          this.router.navigate(['/clientes']);
        }
        return throwError(e);
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente)
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if(e.error.mensaje){
           console.log(e.error.mensaje)
          }
          return throwError(e);
        })
      );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }

        if(e.error.mensaje){
          console.log(e.error.mensaje)
         }
        return throwError(e);
      })
    );
  }


}
