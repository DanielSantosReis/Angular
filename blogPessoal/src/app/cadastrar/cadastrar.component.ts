import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario()
  userSenha: string
  userTipo: string

  constructor(
    private auth: AuthService, 
    private router: Router
    
    ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.userSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.userTipo = event.target.value
  }

  cadastrar(){
    this.usuario.tipo = this.userTipo

    if(this.usuario.senha != this.userSenha){
      alert('Senha incorreta!!!')
    } else {
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        alert('Usuario criado com sucesso... :)')
        this.router.navigate(['/entrar'])
      })
    }


  }

}