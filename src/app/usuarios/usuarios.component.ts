import { environment } from './../../environments/environment.prod';
import { ComandoAlterarSenha } from './../model/ComandoAlterarSenha';
import { TermoBusca } from './../model/TermoBusca';
import { ResponseUsuarioTiposResponse } from './../model/ResponseUsuarioTiposResponse';
import { UsuarioService } from './../service/usuarios.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { ResponseUsuario } from '../model/ResponseUsuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  listaUsuario: Usuario[]
  termo: TermoBusca = new TermoBusca();
  id: number  
  responseUsuario: ResponseUsuario = new ResponseUsuario();
  responseUsuarioTipoResponse: ResponseUsuarioTiposResponse = new ResponseUsuarioTiposResponse();
  usuario: Usuario = new Usuario();


  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    this.findAllUsuarios()
  }

  findAllUsuarios() {
    this.usuarioService.getAllUsuarios(this.termo).subscribe((resp: Usuario[]) => {
      this.listaUsuario = resp
    })
  }  

  pesquisar() {
    this.usuarioService.getAllUsuarios(this.termo).subscribe((resp: Usuario[]) => {
      this.listaUsuario = resp
    })
  }

  pesquisarId(id: number) {
    this.usuarioService.getIdUsuario(id).subscribe((resp: ResponseUsuarioTiposResponse) => {
      this.responseUsuarioTipoResponse = resp
      console.log(this.responseUsuarioTipoResponse)
    })
  }  

  pegarUsuarioLogado() {
    this.usuarioService.getIdUsuario(environment.id).subscribe((resp: ResponseUsuarioTiposResponse) => {
      this.responseUsuarioTipoResponse = resp
      console.log(this.responseUsuarioTipoResponse)
    })
  }
}
