import { ResponseUsuario } from './../model/ResponseUsuario';
import { ComandoAlterarSenha } from './../model/ComandoAlterarSenha';
import { TermoBusca } from './../model/TermoBusca';
import { Usuario } from './../model/Usuario';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioTiposResponse } from '../model/UsuarioTiposResponse';
import { ResponseUsuarioTiposResponse } from '../model/ResponseUsuarioTiposResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', "Bearer " + environment.token)
  }

  getIdUsuario(id: number) {    
    return this.http.get<ResponseUsuarioTiposResponse>(`https://metawaydemo.vps-kinghost.net:8485/api/usuario/buscar/${id}`, this.token)
  }  

  cadastrar(usuarioTiposResponse: UsuarioTiposResponse) {    
    return this.http.post<ResponseUsuarioTiposResponse>('https://metawaydemo.vps-kinghost.net:8485/api/usuario/salvar', usuarioTiposResponse, this.token)    
  }

  getAllUsuarios(termo: TermoBusca): Observable<Usuario[]> {    
    return this.http.post<Usuario[]>('https://metawaydemo.vps-kinghost.net:8485/api/usuario/pesquisar', termo, this.token)
  }  

  postAlterarSenha(comando: ComandoAlterarSenha) {
    return this.http.post<ResponseUsuario>('https://metawaydemo.vps-kinghost.net:8485/api/usuario/alterarSenha', comando, this.token)
  }

  putAtualizar(usuario: Usuario) {
    return this.http.put<ResponseUsuario>('https://metawaydemo.vps-kinghost.net:8485/api/usuario/atualizar', usuario, this.token)
  }
  
}
