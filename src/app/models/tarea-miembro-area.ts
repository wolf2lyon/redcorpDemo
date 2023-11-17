import { MiembroDeArea } from "./miembro-de-area";
import { Tarea } from "./tarea";

export class TareaMiembroArea {
    idTareaMiembroArea: number = 0;
    miembroDeArea: MiembroDeArea = new MiembroDeArea();
    tarea: Tarea = new Tarea();
    active: boolean | undefined;
  }