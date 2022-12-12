import { environment } from './../../environments/environment.prod';
import { AuthResponse } from './../model/AuthResponse';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { LoginRequest } from './../model/LoginRequest';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.scss']
})
export class EntrarComponent implements OnInit {

  loginRequest: LoginRequest = new LoginRequest()
  authResponse: AuthResponse = new AuthResponse()

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.authService.entrar(this.loginRequest).subscribe((resp: AuthResponse) => {
      this.authResponse = resp

      environment.token = this.authResponse.accessToken
      environment.tokenType = this.authResponse.tokenType
      environment.nome = this.authResponse.username
      environment.id = this.authResponse.id
      environment.tipo = this.authResponse.tipos

      console.log(environment.token)
      console.log(environment.tokenType)
      console.log(environment.nome)
      console.log(environment.id)
      console.log(environment.tipo)

      this.router.navigate(["/inicio"])
    }, erro => {
      if (erro.status == 401) {
        alert("Usuário ou senha estão incorretos!")
      }
    })
  }
}
