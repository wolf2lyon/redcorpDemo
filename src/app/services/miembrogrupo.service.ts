import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MiembroEnGrupo } from '../models/miembro-grupo';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MiembrogrupoService {

  private url = `${base_url}/api/miembroEnGrupo`
  private listaCambio = new Subject<MiembroEnGrupo[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<MiembroEnGrupo[]>(this.url);
  }
  insert(miembroArea: MiembroEnGrupo){
    return this.http.post(this.url,miembroArea);
  }
  setList(listaNueva:MiembroEnGrupo[])
  {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number)
  {
    return this.http.get<MiembroEnGrupo>(`${this.url}/${id}`)
  }
  update(r:MiembroEnGrupo)
  {
    return this.http.put(this.url,r);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
