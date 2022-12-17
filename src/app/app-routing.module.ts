import { PessoasDeleteComponent } from './delete/pessoas-delete/pessoas-delete.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { AlterarComponent } from './alterar/alterar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'entrar', pathMatch: 'full'},
  {path: 'entrar', component:EntrarComponent},
  {path: 'cadastrar', component:CadastrarComponent},
  {path: 'inicio', component:InicioComponent},
  {path: 'usuarios', component:UsuariosComponent},
  {path: 'alterar', component:AlterarComponent},
  {path: 'pessoas', component:PessoasComponent},
  {path: 'pessoas-delete/:id', component:PessoasDeleteComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
