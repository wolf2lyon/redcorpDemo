import { GrupoDeProyecto } from "./grupo-proyecto";
import { MiembroDeArea } from "./miembro-de-area";

export class MiembroEnGrupo {
    idMiembroEnGrupo: number = 0;
    miembroDeArea: MiembroDeArea = new MiembroDeArea();
    grupoDeProyecto: GrupoDeProyecto = new GrupoDeProyecto();
    active: boolean | undefined;
  }