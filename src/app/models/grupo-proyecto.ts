import { Proyecto } from "./proyecto";

export class GrupoDeProyecto {
    idGrupoDeProyecto: number = 0;
    nombre: string = "";
    fechaCreacion: string = ""; 
    active: boolean | undefined;
    proyecto: Proyecto = new Proyecto();
  }