import { ResponseContato } from 'src/app/model/ResponseContato';
import { Contato } from 'src/app/model/Contato';
import { ContatosService } from 'src/app/service/contatos.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseBoolean } from 'src/app/model/ResponseBoolean';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-contato-delete',
  templateUrl: './contato-delete.component.html',
  styleUrls: ['./contato-delete.component.scss']
})
export class ContatoDeleteComponent {

  contato: Contato = new Contato();
  listaContato: ResponseContato[];
  responseContato: ResponseContato = new ResponseContato();
  responseBoolean: ResponseBoolean = new ResponseBoolean();
  idContato: number

  constructor(
    private contatoService: ContatosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idContato = this.route.snapshot.params['id']
    this.findByIdContato(this.idContato)
  }
  

  findByIdContato(id: number) {
    this.contatoService.getAllContatosById(id).subscribe((resp: ResponseContato[]) => {
      this.listaContato = resp

      console.log(this.listaContato)
    })
  }

  deletar() {
    this.contatoService.deleteById(this.idContato).subscribe((resp: ResponseBoolean) => {
      this.responseBoolean = resp
      alert(this.responseBoolean.message)
      this.router.navigate(['/contatos'])
    })
  }

}
