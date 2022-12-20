import { Router } from '@angular/router';
import { Foto } from './../model/Foto';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  id = environment.id
  nome = environment.nome
  tipo = environment.tipo  

  constructor(private router: Router) {}

  ngOnInit() {
    
  }

  sair() {
    this.router.navigate(["/entrar"])

    environment.token = ""
    environment.tokenType = ""
    environment.tipo = [""]
    environment.nome = ""
    environment.id = 0
  }

}
