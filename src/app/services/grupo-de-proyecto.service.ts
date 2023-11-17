import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../models/proyecto';
import { GrupoDeProyecto } from '../models/grupo-proyecto';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class GrupoDeProyectoService {

  private url = `${base_url}/api/grupo-de-proyectos`
  private listaCambio = new Subject<GrupoDeProyecto[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<GrupoDeProyecto[]>(this.url);
  }
  insert(grupoproyecto: GrupoDeProyecto){
    return this.http.post(this.url,grupoproyecto);
  }
  setList(listaNueva:GrupoDeProyecto[])
  {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number)
  {
    return this.http.get<GrupoDeProyecto>(`${this.url}/${id}`)
  }
  update(r:GrupoDeProyecto)
  {
    return this.http.put(this.url,r);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
