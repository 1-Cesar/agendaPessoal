import { Foto } from './../model/Foto';
import { ResponseFoto } from './../model/ResponseFoto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponsePessoa } from './../model/ResponsePessoa';
import { Pessoa } from './../model/Pessoa';
import { TermoBuscaPessoa } from './../model/TermoBuscaPessoa';
import { PessoasService } from './../service/pessoas.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent {

  id: number;  
  listaPessoa: Pessoa[];
  termoBuscaPessoa: TermoBuscaPessoa = new TermoBuscaPessoa();
  responsePessoa: ResponsePessoa = new ResponsePessoa();
  responseFoto: ResponseFoto = new ResponseFoto();
  pessoa: Pessoa = new Pessoa();
  foto: Foto = new Foto();


  constructor(    
    private pessoaService: PessoasService,  
    private http: HttpClient  
    ) {}

    ngOnInit() {
      window.scroll(0, 0)     

      this.findAllPessoas()
    } 
    
    findAllPessoas() {
      this.pessoaService.getAllPessoas(this.termoBuscaPessoa).subscribe((resp: Pessoa[]) => {
        this.listaPessoa = resp
      })
    }

    findById() {
      this.pessoaService.getById(this.id).subscribe((resp: ResponsePessoa) => {
        this.responsePessoa = resp
        console.log(this.responsePessoa)
      })
    }

    deletePessoa() {

    }

    putPessoa() {
      
    }

    postPessoa() {

      

      this.pessoaService.postPessoa(this.pessoa).subscribe((resp: ResponsePessoa) => {
        this.responsePessoa = resp
      })

      

      console.log(this.pessoa)
      console.log(this.responsePessoa)

      alert("Pessoa cadastrada com sucesso!")

      this.pessoa = new Pessoa()
    }  
    
    token = {
      headers: new HttpHeaders().set('Authorization', "Bearer " + environment.token)
    }

    inputFileChange(event: any) {
      if (event.target.files && event.target.files[0]) {
        const foto = event.target.files[0];        
  
        const formData = new FormData();
        formData.append('foto', foto)

        let id = this.foto.id        
  
        this.pessoaService.postFoto(formData, id).subscribe((resp: ResponseFoto) => {
          this.responseFoto = resp
       })
      }
      console.log(this.responseFoto)
      alert(this.responseFoto.message)
    }
}
