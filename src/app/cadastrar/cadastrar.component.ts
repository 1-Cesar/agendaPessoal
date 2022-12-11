import { AuthService } from './../service/auth.service';
import { UsuarioTiposResponse } from './../model/UsuarioTiposResponse';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  
  usuarioTiposResponse: UsuarioTiposResponse = new UsuarioTiposResponse();
  


  confirmSenha: string
  tipoUser: string[]

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit()  {
    window.scroll(0,0)
    this.usuarioTiposResponse.usuario = {
      nome: "",
      cpf: "",
      dataNascimento: "",
      email: "",
      password: "",
      telefone: "",
      username: "",
      id: 0
    }
  }

  confirmarSenha(event: any) {
    this.confirmSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.tipoUser = event.target.value
  }

  cadastrar() {
    this.usuarioTiposResponse.tipos = this.tipoUser  

    if (this.usuarioTiposResponse.usuario.password != this.confirmSenha) {
      alert('As senhas estão incorretas!')
    } else {
      this.authService.cadastrar(this.usuarioTiposResponse).subscribe((resp: UsuarioTiposResponse) => {
        this.usuarioTiposResponse = resp
        this.router.navigate(["/entrar"])
        alert("Usuário cadastrado com sucesso!")
      })
    }
  }
}


