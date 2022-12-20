import { ResponseUsuarioTiposResponse } from './../model/ResponseUsuarioTiposResponse';
import { UsuarioService } from '../service/usuarios.service';
import { UsuarioTiposResponse } from './../model/UsuarioTiposResponse';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatCurrency } from '@angular/common';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.scss']
})
export class AlterarComponent {

  usuarioTiposResponse: UsuarioTiposResponse = new UsuarioTiposResponse();
  responseUsuarioTiposResponse: ResponseUsuarioTiposResponse = new ResponseUsuarioTiposResponse();
  confirmSenha: string
  tipoUser: string[]

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  alterar() {

    console.log(this.usuarioTiposResponse)
    
    this.usuarioService.cadastrar(this.usuarioTiposResponse).subscribe((resp: ResponseUsuarioTiposResponse) => {
      this.responseUsuarioTiposResponse = resp

      this.router.navigate(['/inicio'])
      alert("Usuário alterado com sucesso!")

      this.usuarioTiposResponse = new UsuarioTiposResponse()
    })
  }
}


