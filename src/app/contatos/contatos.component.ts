import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ByteArrayResource } from '../model/ByteArrayResource';
import { Contato } from '../model/Contato';
import { ResponseContato } from '../model/ResponseContato';
import { TermoBusca } from '../model/TermoBusca';
import { ContatosService } from '../service/contatos.service';
import { PessoasService } from '../service/pessoas.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent {

  id: number;
  image: any
  listaContatos: Contato[];
  listaContatosById: Contato[];
  termo: TermoBusca = new TermoBusca();
  contato: Contato = new Contato();
  responseContato: ResponseContato = new ResponseContato();
  byteArrayResource: ByteArrayResource = new ByteArrayResource();
  nome: string
  tipoContact: string  

  constructor(
    private router: Router,
    private contatoService: ContatosService,
    private pessoaService: PessoasService,
    private sanitizer: DomSanitizer,      
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      alert("Sua sessão expirou, faça o login novamente!")
      this.router.navigate(['/entrar'])

      console.log(environment.nome)
    }

    this.getAllContatos()
  }

  getAllContatos() {
    this.nome = environment.nome
    this.contatoService.getAllContatos(this.termo).subscribe((resp: Contato[]) => {
      this.listaContatos = resp
      for(let item of this.listaContatos) {
        this.getPhoto(item.pessoa.id)
      }
    })
  }

  getAllContatosById(id: number) {
    this.nome = environment.nome
    this.contatoService.getAllContatosById(id).subscribe((resp: Contato[]) => {
      this.listaContatosById = resp
    })
  }

  postContato() {
    this.contato.tipoContato = this.tipoContact

    this.contatoService.postContato(this.contato).subscribe((resp: ResponseContato) => {
      this.responseContato = resp
    })
  }

  getByIdContato(id: number) {
    this.contatoService.getById(id).subscribe((resp: ResponseContato) => {
      this.responseContato = resp
    })

    alert("Contato criado com sucesso!")

    this.contato = new Contato()
  }

  tipoContato(event: any) {
    this.tipoContact = event.target.value
  }

  getPhoto(id: number) {    
    this.pessoaService.getFoto(id).subscribe(blob => {
      let objectURL = URL.createObjectURL(blob);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);      
    })
  }
}
