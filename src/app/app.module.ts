import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';

import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AlterarComponent } from './alterar/alterar.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { PessoasDeleteComponent } from './delete/pessoas-delete/pessoas-delete.component';
import { ContatosComponent } from './contatos/contatos.component';
import { UsuarioPostComponent } from './post/usuario-post/usuario-post.component';
import { ContatoPostComponent } from './post/contato-post/contato-post.component';
import { PessoaPostComponent } from './post/pessoa-post/pessoa-post.component';
import { PessoaPutComponent } from './put/pessoa-put/pessoa-put.component';
import { UsuarioPutComponent } from './put/usuario-put/usuario-put.component';
import { ContatoPutComponent } from './put/contato-put/contato-put.component';
import { ContatoDeleteComponent } from './delete/contato-delete/contato-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    
    InicioComponent,
    UsuariosComponent,
    AlterarComponent,
    PessoasComponent,    
    PessoasDeleteComponent, ContatosComponent, UsuarioPostComponent, ContatoPostComponent, PessoaPostComponent, PessoaPutComponent, UsuarioPutComponent, ContatoPutComponent, ContatoDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
