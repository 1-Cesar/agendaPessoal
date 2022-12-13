import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioTiposResponse } from '../model/UsuarioTiposResponse';
import { ResponseUsuarioTiposResponse } from '../model/ResponseUsuarioTiposResponse';

@Injectable({
  providedIn: 'root'
})
export class CadastrarService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', "Bearer " + environment.token)
  }

  cadastrar(usuarioTiposResponse: UsuarioTiposResponse) {    
    return this.http.post<ResponseUsuarioTiposResponse>('https://metawaydemo.vps-kinghost.net:8485/api/usuario/salvar', usuarioTiposResponse, this.token)    
  }
  
}
