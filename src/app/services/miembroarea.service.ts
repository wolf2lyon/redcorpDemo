import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MiembroDeArea } from '../models/miembro-de-area';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MiembroareaService {

  private url = `${base_url}/api/miembrosdearea`
  private listaCambio = new Subject<MiembroDeArea[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<MiembroDeArea[]>(this.url);
  }
  insert(miembroArea: MiembroDeArea){
    return this.http.post(this.url,miembroArea);
  }
  setList(listaNueva:MiembroDeArea[])
  {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number)
  {
    return this.http.get<MiembroDeArea>(`${this.url}/${id}`)
  }
  update(r:MiembroDeArea)
  {
    return this.http.put(this.url,r);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
