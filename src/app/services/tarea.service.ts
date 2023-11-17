import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../models/tarea';
import { DescripcionTareaProyecto } from '../models/descripcion-tarea-proyecto';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private url = `${base_url}/api/tareas`
  private listaCambio = new Subject<Tarea[]>();
  private listaDescripcionProject = new Subject<DescripcionTareaProyecto[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Tarea[]>(this.url);
  }
  insert(tarea: Tarea){
    return this.http.post(this.url,tarea);
  }
  setList(listaNueva:Tarea[])
  {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number)
  {
    return this.http.get<Tarea>(`${this.url}/${id}`)
  }
  update(r:Tarea)
  {
    return this.http.put(this.url,r);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
  listDescriptionTaskProject()
  {
    return this.http.get<DescripcionTareaProyecto[]>(`${this.url}/descripciontarea`)
  }
  getlistDescriptionTaskProject()
  {
    return this.listaDescripcionProject.asObservable();
  }
}
