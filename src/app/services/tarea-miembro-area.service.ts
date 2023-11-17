import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentario';
import { TareaMiembroArea } from '../models/tarea-miembro-area';
import { TareaPorMiembro } from '../models/tarea-por-miembro';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TareaMiembroAreaService {

  private url = `${base_url}/api/tareaMiembroArea`
  private listaCambio = new Subject<TareaMiembroArea[]>();
  private listaTareaMiembroArea = new Subject<TareaPorMiembro[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<TareaMiembroArea[]>(this.url);
  }
  insert(tareamiembro: TareaMiembroArea){
    return this.http.post(this.url,tareamiembro);
  }
  setList(listaNueva:TareaMiembroArea[])
  {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number)
  {
    return this.http.get<TareaMiembroArea>(`${this.url}/${id}`)
  }
  update(r:TareaMiembroArea)
  {
    return this.http.put(this.url,r);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
  listTaskToMember(id:number)
  {
    return this.http.get<TareaPorMiembro[]>(`${this.url}/taskmember/${id}`)
  }
  getlistTaskToMember()
  {
    return this.listaTareaMiembroArea.asObservable();
  }
}
