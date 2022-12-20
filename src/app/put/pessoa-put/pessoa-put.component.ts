import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Foto } from 'src/app/model/Foto';
import { Pessoa } from 'src/app/model/Pessoa';
import { ResponseFoto } from 'src/app/model/ResponseFoto';
import { ResponsePessoa } from 'src/app/model/ResponsePessoa';
import { PessoasService } from 'src/app/service/pessoas.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pessoa-put',
  templateUrl: './pessoa-put.component.html',
  styleUrls: ['./pessoa-put.component.scss']
})
export class PessoaPutComponent {

  
  idPessoa: number;
  nome: string;
  responsePessoa: ResponsePessoa = new ResponsePessoa();
  responseFoto: ResponseFoto = new ResponseFoto();
  pessoa: Pessoa = new Pessoa();
  foto: Foto = new Foto();
  formData: FormData = new FormData();


  constructor(    
    private pessoaService: PessoasService,
    private router: Router,
    private route: ActivatedRoute      
    ) {}

    ngOnInit() {
      window.scroll(0, 0)
      
    this.nome = environment.nome
    this.idPessoa = this.route.snapshot.params['id']
    this.findByIdPessoa(this.idPessoa)
    }

    findByIdPessoa(id: number) {
      this.pessoaService.getById(id).subscribe((resp: ResponsePessoa) => {
        this.responsePessoa = resp
        console.log(this.responsePessoa)
      })
    }
    
    postPessoa() { 

      this.pessoa.id = this.responsePessoa.object.id
      this.pessoa.nome = this.responsePessoa.object.nome
      this.pessoa.cpf = this.responsePessoa.object.cpf
      this.pessoa.endereco.bairro = this.responsePessoa.object.endereco.bairro
      this.pessoa.endereco.cep = this.responsePessoa.object.endereco.cep
      this.pessoa.endereco.cidade = this.responsePessoa.object.endereco.cidade
      this.pessoa.endereco.estado = this.responsePessoa.object.endereco.estado
      this.pessoa.endereco.logradouro = this.responsePessoa.object.endereco.logradouro
      this.pessoa.endereco.numero = this.responsePessoa.object.endereco.numero
      this.pessoa.endereco.pais = this.responsePessoa.object.endereco.pais

      this.pessoaService.postPessoa(this.pessoa).subscribe((resp: ResponsePessoa) => {
        this.responsePessoa = resp

        let id = this.responsePessoa.object.id

        this.pessoaService.postFoto(this.formData, id).subscribe((resp: ResponseFoto) => {
          this.responseFoto = resp
       })
      })

      alert("Pessoa alterada com sucesso!")

      this.router.navigate(['/pessoas'])
      this.pessoa = new Pessoa()
    }    

    inputFileChange(event: any) {
      if (event.target.files && event.target.files[0]) {
        const foto = event.target.files[0]; 
        
        this.formData.append('foto', foto) 
      }    
    }


}
