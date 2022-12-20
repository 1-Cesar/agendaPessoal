import { PessoasComponent } from './../pessoas/pessoas.component';
import { ResponseFoto } from './../model/ResponseFoto';
import { PessoasService } from './../service/pessoas.service';
import { ContatosService } from './../service/contatos.service';
import { TermoBusca } from './../model/TermoBusca';
import { ResponseContato } from './../model/ResponseContato';
import { Contato } from './../model/Contato';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ByteArrayResource } from '../model/ByteArrayResource';
import { JsonPipe } from '@angular/common';
import * as fileSaver from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  id: number;
  image: any
  listaContatos: Contato[];
  termo: TermoBusca = new TermoBusca();
  contato: Contato = new Contato();
  responseContato: ResponseContato = new ResponseContato();
  byteArrayResource: ByteArrayResource = new ByteArrayResource();
  nome: string
  tipoContact: string



  fileSystemName: string;
  classpathFileName: string;

  constructor(
    private router: Router,
    private contatoService: ContatosService,
    private pessoaService: PessoasService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      //alert("Sua sessão expirou, faça o login novamente!")
      this.router.navigate(['/entrar'])

      console.log(environment.nome)
    }

    this.getAllContatos()
  }

  getAllContatos() {
    this.nome = environment.nome
    this.contatoService.getAllContatos(this.termo).subscribe((resp: Contato[]) => {
      this.listaContatos = resp
    })
  }

  postContato() {
    this.contato.tipoContato = this.tipoContact

    this.contatoService.postContato(this.contato).subscribe((resp: ResponseContato) => {
      this.responseContato = resp
    })
  }

  getByIdContato(id: number) {
    this.contatoService.getById(id).subscribe((resp: Contato) => {
      this.contato = resp
    })

    alert("Contato criado com sucesso!")

    this.contato = new Contato()
  }

  tipoContato(event: any) {
    this.tipoContact = event.target.value
  }

}