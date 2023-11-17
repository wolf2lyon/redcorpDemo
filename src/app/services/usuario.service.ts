import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { UsuarioProject } from '../models/usuarioProyecto';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/api/usuarios`
  private url2 = `${base_url}/api/proyectos`
  private listaCambio = new Subject<Usuario[]>();
  private listaProject = new Subject<UsuarioProject[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Usuario[]>(this.url);
  }
  insert(rol: Usuario){
    return this.http.post(this.url,rol);
  }
  setList(listaNueva:Usuario[])
  {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number)
  {
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }
  update(r:Usuario)
  {
    return this.http.put(this.url,r);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
  listUserProject(id:number)
  {
    return this.http.get<UsuarioProject[]>(`${this.url2}/userProyect/${id}`)
  }
  getlistUserProject()
  {
    return this.listaProject.asObservable();
  }
  
}
