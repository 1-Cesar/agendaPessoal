import { ResponsePessoa } from './../../model/ResponsePessoa';
import { ResponseBoolean } from './../../model/ResponseBoolean';
import { environment } from './../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoasService } from './../../service/pessoas.service';
import { Component } from '@angular/core';
import { Pessoa } from 'src/app/model/Pessoa';

@Component({
  selector: 'app-pessoas-delete',
  templateUrl: './pessoas-delete.component.html',
  styleUrls: ['./pessoas-delete.component.scss']
})
export class PessoasDeleteComponent {

  pessoa: Pessoa = new Pessoa();
  responsePessoa: ResponsePessoa = new ResponsePessoa();
  responseBoolean: ResponseBoolean = new ResponseBoolean();
  idPessoa: number

  constructor(
    private pessoaService: PessoasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idPessoa = this.route.snapshot.params['id']
    this.findByIdPessoa(this.idPessoa)
  }
  

  findByIdPessoa(id: number) {
    this.pessoaService.getById(id).subscribe((resp: ResponsePessoa) => {
      this.responsePessoa = resp
    })
  }

  deletar() {
    this.pessoaService.deleteById(this.idPessoa).subscribe((resp: ResponseBoolean) => {
      this.responseBoolean = resp
      alert(this.responseBoolean.message)
      this.router.navigate(['/pessoas'])
    })
  }

}
