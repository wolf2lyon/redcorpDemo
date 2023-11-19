import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUsuario } from '../models/login-usuario';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'https://springredcorp.azurewebsites.net/authenticate';

  constructor(private http:HttpClient,
    private jwtHelper: JwtHelperService) { }

  public login(loginUsuario:LoginUsuario){
    return this.http.post<LoginUsuario>(this.authURL,loginUsuario)
  }

  public isAuth():boolean
  {
    const jwttoken = localStorage.getItem('jwttoken');
    if(this.jwtHelper.isTokenExpired(jwttoken) || !localStorage.getItem("jwttoken"))
    {
      return false
    }

    return true;
  }

  public showUser(){
    // let headers = new HttpHeaders()
    // .set("Authorization",`Bearer ${localStorage.getItem('jwttoken')}`)
    // console.log(headers)
    return this.http.get("https://springredcorp.azurewebsites.net//api/areasdetrabajo/panel")
  }
  showRole(){
    let token = localStorage.getItem("jwttoken");
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
}
