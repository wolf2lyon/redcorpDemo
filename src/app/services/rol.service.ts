import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { Rol } from '../models/rol';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = `${base_url}/api/roles`
  private listaCambio = new Subject<Rol[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Rol[]>(this.url);
  }
  insert(rol: Rol){
    return this.http.post(this.url,rol);
  }
  setList(listaNueva:Rol[])
  {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number)
  {
    return this.http.get<Rol>(`${this.url}/${id}`)
  }
  update(r:Rol)
  {
    return this.http.put(this.url,r);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
