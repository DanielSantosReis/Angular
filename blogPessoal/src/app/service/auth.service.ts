import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor( 
    private http: HttpClient
  ) { }

  login (userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://blogdaniel1.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastro(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://blogdaniel1.herokuapp.com/usuarios/cadastrar', usuario)
  }

}
