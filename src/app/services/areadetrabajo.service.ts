import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { Rol } from '../models/rol';
import { HttpClient } from '@angular/common/http';
import { AreaDeTrabajo } from '../models/areadetrabajo';
import { UsuarioAreaTrabajo } from '../models/usuario-area-trabajo';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class AreadetrabajoService {

  private url = `${base_url}/api/areasdetrabajo`
  private listaCambio = new Subject<AreaDeTrabajo[]>();
  private listaUsuarioAreaTrabajo = new Subject<UsuarioAreaTrabajo[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<AreaDeTrabajo[]>(this.url);
  }
  insert(areadetrabajo: AreaDeTrabajo){
    return this.http.post(this.url,areadetrabajo);
  }
  setList(listaNueva:AreaDeTrabajo[])
  {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number)
  {
    return this.http.get<AreaDeTrabajo>(`${this.url}/${id}`)
  }
  update(r:AreaDeTrabajo)
  {
    return this.http.put(this.url,r);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
  listAreaWorkUser(id:number)
  {
    return this.http.get<UsuarioAreaTrabajo[]>(`${this.url}/AreasUser/${id}`)
  }
  getlistAreaWorkUser()
  {
    return this.listaUsuarioAreaTrabajo.asObservable();
  }
}
