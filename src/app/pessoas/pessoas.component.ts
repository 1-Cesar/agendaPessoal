import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Foto } from './../model/Foto';
import { ResponseFoto } from './../model/ResponseFoto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponsePessoa } from './../model/ResponsePessoa';
import { Pessoa } from './../model/Pessoa';
import { TermoBuscaPessoa } from './../model/TermoBuscaPessoa';
import { PessoasService } from './../service/pessoas.service';
import { Component, Sanitizer } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent {

   
  nome: string
  idFoto: number
  listaPessoa: Pessoa[];
  termoBuscaPessoa: TermoBuscaPessoa = new TermoBuscaPessoa();
  responsePessoa: ResponsePessoa = new ResponsePessoa(); 
  pessoa: Pessoa = new Pessoa();
  image: any;  
  
  constructor(    
    private pessoaService: PessoasService,
    private sanitizer: DomSanitizer,      
    ) {}

    ngOnInit() {
      window.scroll(0, 0)
        
      this.findAllPessoas()                             
    } 
    
    findAllPessoas() {            
      this.nome = environment.nome
      this.pessoaService.getAllPessoas(this.termoBuscaPessoa).subscribe((resp: Pessoa[]) => {
        this.listaPessoa = resp
        for (let item of this.listaPessoa) {
          this.getPhoto(item.id)
        }        
      })       
    }

    findById(id: number) {
      this.pessoaService.getById(id).subscribe((resp: ResponsePessoa) => {
        this.responsePessoa = resp
        console.log(this.responsePessoa)
      })
    }
    
    getPhoto(id: number) {
      this.pessoaService.getFoto(id).subscribe(blob => {
        let objectURL = URL.createObjectURL(blob);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);          
      })
    }
}
