import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { default as moment } from 'moment-es6';
import { addDays, format } from 'date-fns';
import { PasswordService } from 'src/app/services/password.service';
@Component({
  selector: 'app-creaedita-usuario',
  templateUrl: './creaedita-usuario.component.html',
  styleUrls: ['./creaedita-usuario.component.scss'],
})
export class CreaeditaUsuarioComponent {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listRoles: Rol[] = [];
  // maxFecha: Date = moment().add(-1, 'days').toDate();
  // maxDate: Date = moment().subtract(1, 'days').toDate();
  maxDate = addDays(new Date(), -1);
  formattedMaxDate = format(this.maxDate, 'yyyy-MM-dd');
  constructor(
    private uS: UsuarioService,
    private rS: RolService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pS: PasswordService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idUsuario: [''],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      rol: ['', Validators.required],
      userName: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
    this.rS.list().subscribe((data) => {
      this.listRoles = data;
    });
  }

  aceptar(): void {
    this.rS.listId(this.form.value.rol).subscribe((rolSelect)=>{
      if (this.form.valid) {
        this.usuario.idUsuario = this.form.value.idUsuario;
        this.usuario.nombre = this.form.value.nombre;
        this.usuario.correo = this.form.value.correo;
        this.usuario.fechaNacimiento = this.form.value.fechaNacimiento;
        this.usuario.rol=rolSelect;
        this.usuario.userName = this.form.value.correo;
        this.usuario.active = true;
  
        this.pS
          .hashPassword(this.form.value.contrasena)
          .then((hashedPassword) => {
            this.usuario.contrasena = hashedPassword;
            if (this.edicion) {
              this.uS.update(this.usuario).subscribe(() => {
                this.uS.list().subscribe((data) => {
                  this.uS.setList(data);
                });
              });
            } else {
              console.log(this.usuario)
              this.uS.insert(this.usuario).subscribe((data) => {
                console.log(data)
                this.uS.list().subscribe((data) => {
                  this.uS.setList(data);
                });
              });
            }
          });
        this.router.navigate(['usuarios']);
      } else {
        this.mensaje = 'Por favor complete todos los campos obligatorios.';
      }
    } )
   
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUsuario: new FormControl(data.idUsuario),
          nombre: new FormControl(data.nombre),
          correo: new FormControl(data.correo),
          fechaNacimiento: new FormControl(data.fechaNacimiento),
          rol: new FormControl(data.rol.idRol),
          userName: new FormControl(data.userName),
          contrasena: new FormControl(data.contrasena),
        });
      });
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
