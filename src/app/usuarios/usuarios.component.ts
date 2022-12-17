import { environment } from './../../environments/environment.prod';
import { ComandoAlterarSenha } from './../model/ComandoAlterarSenha';
import { TermoBusca } from './../model/TermoBusca';
import { ResponseUsuarioTiposResponse } from './../model/ResponseUsuarioTiposResponse';
import { UsuarioService } from './../service/usuarios.service';
import { Router } from '@angular/router';
import { CadastrarComponent } from './../cadastrar/cadastrar.component';
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
  comando: ComandoAlterarSenha = new ComandoAlterarSenha();
  responseUsuario: ResponseUsuario = new ResponseUsuario();
  responseUsuarioTipoResponse: ResponseUsuarioTiposResponse = new ResponseUsuarioTiposResponse();
  usuario: Usuario = new Usuario();
  

  constructor(
    private router: Router, 
    private usuarioService: UsuarioService
    ) {}

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

    pesquisarId() {
      this.usuarioService.getIdUsuario(this.id).subscribe((resp: ResponseUsuarioTiposResponse) => {
        this.responseUsuarioTipoResponse = resp
        console.log(this.responseUsuarioTipoResponse)
      })
    }

    alterarSenha() {
      this.usuarioService.postAlterarSenha(this.comando).subscribe((resp: ResponseUsuario) => {
        this.responseUsuario = resp
        alert("Senha alterada com sucesso!")
      })
    }

    pegarUsuarioLogado() {
      this.usuarioService.getIdUsuario(environment.id).subscribe((resp: ResponseUsuarioTiposResponse) => {
        this.responseUsuarioTipoResponse = resp
        console.log(this.responseUsuarioTipoResponse)
      })
    }

    alterarCadastro() {
      this.usuario.nome = this.responseUsuarioTipoResponse.object.usuario.nome
      this.usuario.cpf = this.responseUsuarioTipoResponse.object.usuario.cpf
      this.usuario.dataNascimento = this.responseUsuarioTipoResponse.object.usuario.dataNascimento
      this.usuario.email = this.responseUsuarioTipoResponse.object.usuario.email
      this.usuario.telefone = this.responseUsuarioTipoResponse.object.usuario.telefone
      this.usuario.id = environment.id

      this.usuarioService.putAtualizar(this.usuario).subscribe((resp: ResponseUsuario) => {
        this.responseUsuario = resp
        alert("Usuario alterado com sucesso!")
      })
    }
  
}
