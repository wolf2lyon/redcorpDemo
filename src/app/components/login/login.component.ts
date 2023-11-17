import { Component ,OnInit} from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  nombreUsuario!: string;
  password!: string;
  loginUsuario!: LoginUsuario;
  rol!:string;

  constructor(
    private authService:AuthService,
    private router:Router
  )
  {
    
  }

  onLogin():void {

    this.loginUsuario = new LoginUsuario(this.nombreUsuario,this.password)
    this.authService.login(this.loginUsuario).subscribe((resp:any) => {
      localStorage.setItem('jwttoken',resp.jwttoken)
      this.rol = this.authService.showRole();
      localStorage.setItem('rol',this.rol);
    })
    if(localStorage.getItem('rol')==="ADMIN")
    {
      this.router.navigate(['panel']);
    }else{
      this.router.navigate(['tarea']);
    }
  }

  
}
