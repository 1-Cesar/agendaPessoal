import { environment } from './../../environments/environment.prod';
import { ResponseUsuarioTiposResponse } from './../model/ResponseUsuarioTiposResponse';
import { AuthResponse } from './../model/AuthResponse';
import { UsuarioTiposResponse } from './../model/UsuarioTiposResponse';
import { LoginRequest } from './../model/LoginRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  entrar(loginRequest: LoginRequest) {
    return this.http.post<AuthResponse>('https://metawaydemo.vps-kinghost.net:8485/api/auth/login', loginRequest)    
  }

  cadastrar(usuarioTiposResponse: UsuarioTiposResponse):Observable<UsuarioTiposResponse> {    
    return this.http.post<UsuarioTiposResponse>('https://metawaydemo.vps-kinghost.net:8485/api/usuario/salvar', usuarioTiposResponse)    
  }

  logado() {
    let ok: boolean = false

    if(environment.token != '') {
      ok = true
    }

    return ok
  }
}
