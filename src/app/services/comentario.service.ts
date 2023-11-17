import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentario';
import { ComentarioTarea } from '../models/comentarios-tarea';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private url = `${base_url}/api/comentarios`
  private listaCambio = new Subject<Comentario[]>();
  private listaComentarioTarea = new Subject<ComentarioTarea[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Comentario[]>(this.url);
  }
  insert(comentario: Comentario){
    return this.http.post(this.url,comentario);
  }
  setList(listaNueva:Comentario[])
  {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id:number)
  {
    return this.http.get<Comentario>(`${this.url}/${id}`)
  }
  update(r:Comentario)
  {
    return this.http.put(this.url,r);
  }
  delete(id:number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
  listQuantityAnnouncementsTask()
  {
    return this.http.get<ComentarioTarea[]>(`${this.url}/idcomentario`)
  }
  getQuantityAnnouncementsTask()
  {
    return this.listaComentarioTarea.asObservable();
  }
}
