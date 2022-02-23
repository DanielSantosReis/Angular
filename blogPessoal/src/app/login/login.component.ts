import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  login() {
    this.auth.login(this.userLogin).subscribe({
      next: (resp: UserLogin) => {
        this.userLogin = resp;
        
        environment.foto = this.userLogin.foto
        environment.nome = this.userLogin.nome
        environment.id = this.userLogin.id
        environment.token = this.userLogin.token
        environment.tipo = this.userLogin.tipo

        // console.log(environment.token)
        // console.log(environment.nome)
        // console.log(environment.foto)
        // console.log(environment.id)

        this.router.navigate(['/inicio'])
  
      },
      error: erro => {
        if(erro.status == 401){
          alert("usuário ou senha inválidos")
        }
      }
    })
}
