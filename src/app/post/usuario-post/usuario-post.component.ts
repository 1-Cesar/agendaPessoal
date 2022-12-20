import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseUsuarioTiposResponse } from 'src/app/model/ResponseUsuarioTiposResponse';
import { UsuarioTiposResponse } from 'src/app/model/UsuarioTiposResponse';
import { UsuarioService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-usuario-post',
  templateUrl: './usuario-post.component.html',
  styleUrls: ['./usuario-post.component.scss']
})
export class UsuarioPostComponent {
  
  usuarioTiposResponse: UsuarioTiposResponse = new UsuarioTiposResponse();
  responseUsuarioTiposResponse: ResponseUsuarioTiposResponse = new ResponseUsuarioTiposResponse();
  confirmSenha: string
  tipoUser: string[]

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    window.scroll(0, 0)    
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
      this.usuarioService.cadastrar(this.usuarioTiposResponse).subscribe((resp: ResponseUsuarioTiposResponse) => {
        this.responseUsuarioTiposResponse = resp

        this.router.navigate(['/inicio'])
        alert("Usuário cadastrado com sucesso!")

        this.usuarioTiposResponse = new UsuarioTiposResponse()
      })
    }
  }

}
