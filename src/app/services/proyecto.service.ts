import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../models/proyecto';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private url = `${base_url}/api/proyectos`
  private listaCambio = new Subject<Proyecto[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Proyecto[]>(this.url);
  }
  insert(proyecto: Proyecto){
    return this.http.post(this.url,proyecto);
  }
  setList(listaNueva:Proyecto[])
  {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number)
  {
    return this.http.get<Proyecto>(`${this.url}/${id}`)
  }
  update(r:Proyecto)
  {
    return this.http.put(this.url,r);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }

}
