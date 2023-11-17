import { Rol } from './rol';

export class Usuario {
  idUsuario: number = 0;
  nombre: string = '';
  correo: string = '';
  fechaNacimiento: Date = new Date();
  rol: Rol = new Rol();
  userName: string = '';
  contrasena: string = '';
  active: boolean | undefined;
}
