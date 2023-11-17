import { Usuario } from "./usuario";

export class Proyecto {
    idProyecto: number = 0;
    nombre: string = "";
    descripcion: string = "";
    usuario: Usuario = new Usuario(); 
    fechaCreacion: Date = new Date();
    active: boolean | undefined;
  }