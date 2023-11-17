import { AreaDeTrabajo } from "./areadetrabajo";
import { GrupoDeProyecto } from "./grupo-proyecto";
import { Usuario } from "./usuario";

export class Comunicado {
    idComunicado: number = 0;
    titulo: string = "";
    descripcion: string = "";
    fechaCreacion: string = ""; 
    active: boolean | undefined;
    usuario: Usuario = new Usuario();
    areaDeTrabajo: AreaDeTrabajo = new AreaDeTrabajo();
    grupoDeProyecto: GrupoDeProyecto = new GrupoDeProyecto();
  }