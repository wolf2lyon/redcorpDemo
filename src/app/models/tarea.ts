import { GrupoDeProyecto } from "./grupo-proyecto";
import { Proyecto } from "./proyecto";

export class Tarea {
    idTarea: number = 0;
    nombre: string = "";
    descripcion: string = "";
    fechaLimite: string = ""; 
    grupoDeProyecto: GrupoDeProyecto = new GrupoDeProyecto();
    proyecto: Proyecto = new Proyecto();
    fechaCreacion: string = ""; 
    active: boolean | undefined;
  }