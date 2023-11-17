import { Tarea } from "./tarea";

export class Comentario {
    idComentario: number = 0;
    comentario: string = "";
    active: boolean | undefined;
    tarea: Tarea = new Tarea();
  }