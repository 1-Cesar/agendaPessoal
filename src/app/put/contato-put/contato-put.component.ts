import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contato } from 'src/app/model/Contato';
import { ResponseContato } from 'src/app/model/ResponseContato';
import { ContatosService } from 'src/app/service/contatos.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-contato-put',
  templateUrl: './contato-put.component.html',
  styleUrls: ['./contato-put.component.scss']
})
export class ContatoPutComponent {
     
  idContato: number
  listaContato: ResponseContato[]
  contato: Contato = new Contato();
  responseContato: ResponseContato = new ResponseContato();
  tipoContact: string

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private contatoService: ContatosService,    
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      alert("Sua sessão expirou, faça o login novamente!")
      this.router.navigate(['/entrar'])      
    }    

    this.idContato = this.route.snapshot.params['id']
    this.findByIdContato(this.idContato)       
  }

  findByIdContato(id: number) {
    this.contatoService.getById(id).subscribe((resp: Contato) => {
      this.contato = resp

      console.log(this.contato)
    })
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
