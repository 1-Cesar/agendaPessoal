import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Foto } from 'src/app/model/Foto';
import { Pessoa } from 'src/app/model/Pessoa';
import { ResponseFoto } from 'src/app/model/ResponseFoto';
import { ResponsePessoa } from 'src/app/model/ResponsePessoa';
import { PessoasService } from 'src/app/service/pessoas.service';

@Component({
  selector: 'app-pessoa-post',
  templateUrl: './pessoa-post.component.html',
  styleUrls: ['./pessoa-post.component.scss']
})
export class PessoaPostComponent {
  
  responsePessoa: ResponsePessoa = new ResponsePessoa();
  responseFoto: ResponseFoto = new ResponseFoto();
  pessoa: Pessoa = new Pessoa();
  foto: Foto = new Foto();
  formData: FormData = new FormData();


  constructor(  
    private router: Router,  
    private pessoaService: PessoasService      
    ) {}

    ngOnInit() {
      window.scroll(0, 0) 
    }
    
    postPessoa() { 
      this.pessoaService.postPessoa(this.pessoa).subscribe((resp: ResponsePessoa) => {
        this.responsePessoa = resp        

        this.pessoaService.postFoto(this.formData, this.responsePessoa.object.id).subscribe((resp: ResponseFoto) => {
          this.responseFoto = resp
       })
      })

      alert("Pessoa cadastrada com sucesso!")

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
