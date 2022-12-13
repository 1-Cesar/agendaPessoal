import { ResponseUsuarioTiposResponse } from './../model/ResponseUsuarioTiposResponse';
import { CadastrarService } from './../service/cadastrar.service';
import { UsuarioTiposResponse } from './../model/UsuarioTiposResponse';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatCurrency } from '@angular/common';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  
  usuarioTiposResponse: UsuarioTiposResponse = new UsuarioTiposResponse();
  responseUsuarioTiposResponse: ResponseUsuarioTiposResponse = new ResponseUsuarioTiposResponse();
  confirmSenha: string
  tipoUser: string[]

  constructor(private cadastrarService: CadastrarService, private router: Router) { }

  ngOnInit()  {
    window.scroll(0,0)
  }

  confirmarSenha(event: any) {
    this.confirmSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.tipoUser = [event.target.value]
  }

  cadastrar() {
    this.usuarioTiposResponse.tipos = this.tipoUser     

    if (this.usuarioTiposResponse.usuario.password != this.confirmSenha) {
      alert('As senhas estão incorretas!')
    } else {
      console.log(this.usuarioTiposResponse)
      console.log(this.usuarioTiposResponse.tipos)
      this.cadastrarService.cadastrar(this.usuarioTiposResponse).subscribe((resp: ResponseUsuarioTiposResponse) => {
        this.responseUsuarioTiposResponse = resp  
        
        this.router.navigate(['/inicio'])
        alert("Usuário cadastrado com sucesso!")

        
      })
    }
  }
}


