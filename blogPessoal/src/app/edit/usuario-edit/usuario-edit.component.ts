import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  
  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmSenha: string
  tipoUsuario: string


  constructor(
    private authService: AuthService,
    private rout: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      alert('Seção expirada, faça login novamente!')
      this.router.navigate(['/login'])
    }

    this.idUsuario = this.rout.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
    this.authService.refreshToken();
  }

  confirmaSenha(event: any){
    this.confirmSenha = event.target.value
  }

tipoUser(event: any){
  this.tipoUsuario = event.target.value
}

atualizar(){
  this.usuario.tipo = this.tipoUsuario

  if(this.usuario.senha != this.confirmSenha){
    alert('As senhas estão incorretas')
  } else {
    this.authService.cadastrar(this.usuario).subscribe((resp: Usuario)=> {
      this.usuario = resp
      this.router.navigate(['/login'])
      alert('Atualizado com sucesso, faça o login novamente')
      environment.token = ''
      environment.nome = ''
      environment.foto = ''
      environment.id = 0
      this.router.navigate(['/login'])
    })
}
}

findByIdUsuario(id: number){
  this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=>{
    this.usuario = resp
  })
}

}
