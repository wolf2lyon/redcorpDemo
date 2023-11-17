import { AreaDeTrabajo } from "./areadetrabajo";
import { Usuario } from "./usuario";

export class MiembroDeArea {
    idMiembroDeArea: number = 0;
    usuario: Usuario = new Usuario();
    active: boolean | undefined;
    areaDeTrabajo: AreaDeTrabajo = new AreaDeTrabajo();
  }