import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from 'src/app/model/Contato';
import { ResponseContato } from 'src/app/model/ResponseContato';
import { ContatosService } from 'src/app/service/contatos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-contato-post',
  templateUrl: './contato-post.component.html',
  styleUrls: ['./contato-post.component.scss']
})
export class ContatoPostComponent {

     
  
  contato: Contato = new Contato();
  responseContato: ResponseContato = new ResponseContato();
  tipoContact: string

  constructor(
    private router: Router,
    private contatoService: ContatosService,    
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      alert("Sua sessão expirou, faça o login novamente!")
      this.router.navigate(['/entrar'])      
    }    
  }

  postContato() {
    this.contato.tipoContato = this.tipoContact

    this.contatoService.postContato(this.contato).subscribe((resp: ResponseContato) => {
      this.responseContato = resp
    })
  }

  tipoContato(event: any) {
    this.tipoContact = event.target.value
  }

}
