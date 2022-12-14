import { ResponseBoolean } from './../model/ResponseBoolean';
import { ResponseFoto } from './../model/ResponseFoto';
import { ResponsePessoa } from './../model/ResponsePessoa';
import { Observable } from 'rxjs';
import { Pessoa } from './../model/Pessoa';
import { TermoBuscaPessoa } from './../model/TermoBuscaPessoa';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', "Bearer " + environment.token)
  }

  tokenFoto = new HttpHeaders().set('Authorization', "Bearer " + environment.token)

  getAllPessoas(termo: TermoBuscaPessoa): Observable<Pessoa[]> {
    return this.http.post<Pessoa[]>('https://metawaydemo.vps-kinghost.net:8485/api/pessoa/pesquisar', termo, this.token)
  }

  getById(id: number) {
    return this.http.get<ResponsePessoa>(`https://metawaydemo.vps-kinghost.net:8485/api/pessoa/buscar/${id}`, this.token)
  }

  deleteById(id: number) {
    return this.http.delete<ResponseBoolean>(`https://metawaydemo.vps-kinghost.net:8485/api/pessoa/remover/${id}`, this.token)
  }

  postPessoa(pessoa: Pessoa) {
    return this.http.post<ResponsePessoa>('https://metawaydemo.vps-kinghost.net:8485/api/pessoa/salvar', pessoa, this.token)
  }

  postFoto(formData: FormData, id: number) {
    return this.http.post<ResponseFoto>(`https://metawaydemo.vps-kinghost.net:8485/api/foto/upload/${id}`, formData, this.token)
  }
  
  getFoto(id: number): Observable<any> {
    return this.http.get<any>(`https://metawaydemo.vps-kinghost.net:8485/api/foto/download/${id}`, {headers: this.tokenFoto, responseType:'blob' as 'json'})
  }

}

