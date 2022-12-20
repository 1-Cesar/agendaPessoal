import { ResponseBoolean } from './../model/ResponseBoolean';
import { ResponseContato } from './../model/ResponseContato';
import { Observable } from 'rxjs';
import { TermoBusca } from './../model/TermoBusca';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contato } from '../model/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', "Bearer " + environment.token)
  }

  getAllContatos(termo: TermoBusca): Observable<Contato[]> {
    return this.http.post<Contato[]>('https://metawaydemo.vps-kinghost.net:8485/api/contato/pesquisar', termo, this.token)
  }

  getAllContatosById(id: number): Observable<ResponseContato[]> {
    return this.http.get<ResponseContato[]>(`https://metawaydemo.vps-kinghost.net:8485/api/contato/listar/${id}`, this.token)
  }

  getById(id: number) {
    return this.http.get<Contato>(`https://metawaydemo.vps-kinghost.net:8485/api/contato/listar/${id}`, this.token)
  }

  deleteById(id: number) {
    return this.http.delete<ResponseBoolean>(`https://metawaydemo.vps-kinghost.net:8485/api/contato/remover/${id}`, this.token)
  }

  postContato(contato: Contato) {
    return this.http.post<ResponseContato>('https://metawaydemo.vps-kinghost.net:8485/api/contato/salvar', contato, this.token)
  }
}
