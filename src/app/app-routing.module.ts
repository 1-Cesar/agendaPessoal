import { ContatoPutComponent } from './put/contato-put/contato-put.component';
import { ContatoDeleteComponent } from './delete/contato-delete/contato-delete.component';
import { PessoaPutComponent } from './put/pessoa-put/pessoa-put.component';
import { UsuarioPutComponent } from './put/usuario-put/usuario-put.component';
import { ContatosComponent } from './contatos/contatos.component';
import { PessoaPostComponent } from './post/pessoa-post/pessoa-post.component';
import { UsuarioPostComponent } from './post/usuario-post/usuario-post.component';
import { ContatoPostComponent } from './post/contato-post/contato-post.component';
import { PessoasDeleteComponent } from './delete/pessoas-delete/pessoas-delete.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { AlterarComponent } from './alterar/alterar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { EntrarComponent } from './entrar/entrar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'entrar', pathMatch: 'full'},
  {path: 'entrar', component:EntrarComponent},  
  {path: 'inicio', component:InicioComponent},
  {path: 'usuarios', component:UsuariosComponent},
  {path: 'alterar', component:AlterarComponent},
  {path: 'pessoas', component:PessoasComponent},
  {path: 'contatos', component:ContatosComponent},
  {path: 'contato-post', component:ContatoPostComponent},
  {path: 'usuario-post', component:UsuarioPostComponent},
  {path: 'pessoa-post', component:PessoaPostComponent},
  {path: 'usuario-put/:id', component:UsuarioPutComponent},
  {path: 'pessoa-put/:id', component:PessoaPutComponent},
  {path: 'contato-put/:id', component:ContatoPutComponent},
  {path: 'pessoas-delete/:id', component:PessoasDeleteComponent},
  {path: 'contato-delete/:id', component:ContatoDeleteComponent}    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
