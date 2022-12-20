import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComandoAlterarSenha } from 'src/app/model/ComandoAlterarSenha';
import { ResponseUsuario } from 'src/app/model/ResponseUsuario';
import { ResponseUsuarioTiposResponse } from 'src/app/model/ResponseUsuarioTiposResponse';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioTiposResponse } from 'src/app/model/UsuarioTiposResponse';
import { UsuarioService } from 'src/app/service/usuarios.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-put',
  templateUrl: './usuario-put.component.html',
  styleUrls: ['./usuario-put.component.scss']
})
export class UsuarioPutComponent {
  
  usuario: Usuario = new Usuario;
  responseUsuario: ResponseUsuario = new ResponseUsuario;
  usuarioTiposResponse: UsuarioTiposResponse = new UsuarioTiposResponse();
  responseUsuarioTiposResponse: ResponseUsuarioTiposResponse = new ResponseUsuarioTiposResponse();
  confirmSenha: string
  tipoUser: string[]
  comando: ComandoAlterarSenha = new ComandoAlterarSenha();
  idUsuario: number  
  nome: string


  constructor(
    private usuarioService: UsuarioService, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    window.scroll(0, 0)
    
    this.nome = environment.nome
    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  } 

  findByIdUsuario(id: number) {
    this.usuarioService.getIdUsuario(id).subscribe((resp: ResponseUsuarioTiposResponse) => {
      this.responseUsuarioTiposResponse = resp
    })
  }

  putUsuario() {
    if (this.responseUsuarioTiposResponse.object.usuario.nome == this.nome) {
    
      this.usuario.nome = this.responseUsuarioTiposResponse.object.usuario.nome
      this.usuario.cpf = this.responseUsuarioTiposResponse.object.usuario.cpf
      this.usuario.dataNascimento = this.responseUsuarioTiposResponse.object.usuario.dataNascimento
      this.usuario.email = this.responseUsuarioTiposResponse.object.usuario.email
      this.usuario.telefone = this.responseUsuarioTiposResponse.object.usuario.telefone
      this.usuario.username = this.responseUsuarioTiposResponse.object.usuario.username
      this.usuario.id = this.responseUsuarioTiposResponse.object.usuario.id

      this.usuarioService.putUsuario(this.usuario).subscribe((resp: ResponseUsuario) => {
      this.responseUsuario = resp      

      this.router.navigate(['/inicio'])
      alert("Usuário alterado com sucesso!")      
    })
    } else {
      this.usuarioTiposResponse.usuario.nome = this.responseUsuarioTiposResponse.object.usuario.nome
      this.usuarioTiposResponse.usuario.cpf = this.responseUsuarioTiposResponse.object.usuario.cpf
      this.usuarioTiposResponse.usuario.dataNascimento = this.responseUsuarioTiposResponse.object.usuario.dataNascimento
      this.usuarioTiposResponse.usuario.email = this.responseUsuarioTiposResponse.object.usuario.email
      this.usuarioTiposResponse.usuario.telefone = this.responseUsuarioTiposResponse.object.usuario.telefone
      this.usuarioTiposResponse.usuario.username = this.responseUsuarioTiposResponse.object.usuario.username
      this.usuarioTiposResponse.usuario.id = this.responseUsuarioTiposResponse.object.usuario.id
      this.usuarioTiposResponse.tipos = this.responseUsuarioTiposResponse.object.tipos

      this.usuarioService.cadastrar(this.usuarioTiposResponse).subscribe((resp: ResponseUsuarioTiposResponse) => {
      this.responseUsuarioTiposResponse = resp

      console.log(this.usuarioTiposResponse)  
      console.log(this.responseUsuarioTiposResponse)

      this.router.navigate(['/usuarios'])
      alert("Usuário alterado com sucesso!")      
    })
    }
    
  }

  alterarSenha() {
    this.usuarioService.postAlterarSenha(this.comando).subscribe((resp: ResponseUsuario) => {
      this.responseUsuario = resp
      alert("Senha alterada com sucesso!")
    })
  }

  tipoUsuario(event: any) {
    this.tipoUser = [event.target.value]
  }

}
