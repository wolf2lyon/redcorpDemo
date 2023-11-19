import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { addDays, format } from 'date-fns';
import { AreaDeTrabajo } from 'src/app/models/areadetrabajo';
import { Comunicado } from 'src/app/models/comunicado';
import { GrupoDeProyecto } from 'src/app/models/grupo-proyecto';
import { Usuario } from 'src/app/models/usuario';
import { AreadetrabajoService } from 'src/app/services/areadetrabajo.service';
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { GrupoDeProyectoService } from 'src/app/services/grupo-de-proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-creaedita-comunicado',
  templateUrl: './creaedita-comunicado.component.html',
  styleUrls: ['./creaedita-comunicado.component.scss'],
})
export class CreaeditaComunicadoComponent {
  form: FormGroup = new FormGroup({});
  comunicado: Comunicado = new Comunicado();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listUsuarios: Usuario[] = [];
  listAreas: AreaDeTrabajo[] = [];
  listGrupos: GrupoDeProyecto[] = [];
  // maxFecha: Date = moment().add(-1, 'days').toDate();
  // maxDate: Date = moment().subtract(1, 'days').toDate();
  maxDate = addDays(new Date(), -1);
  formattedMaxDate = format(this.maxDate, 'yyyy-MM-dd');
  constructor(
    private uS: UsuarioService,
    private aS: AreadetrabajoService,
    private gS: GrupoDeProyectoService,
    private cS: ComunicadoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idComunicado: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuario: ['', Validators.required],
      areatrabajo: ['', Validators.required],
      grupoproyecto: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      const dataFilter = data.filter(item => item.active === true)
      this.listUsuarios = dataFilter;
    });
    this.aS.list().subscribe((data) => {
      const dataFilter = data.filter(item => item.active === true)
      this.listAreas = dataFilter;
    });
    this.gS.list().subscribe((data) => {
      const dataFilter = data.filter(item => item.active === true)
      this.listGrupos = dataFilter;
    });
  }

  aceptar(): void {
    this.gS.listId(this.form.value.grupoproyecto).subscribe((grupoSelect) => {
      this.aS.listId(this.form.value.areatrabajo).subscribe((areaSelect) => {
        this.uS.listId(this.form.value.usuario).subscribe((usuarioSelect) => {
          if (this.form.valid) {
            this.comunicado.idComunicado = this.form.value.idComunicado;
            this.comunicado.titulo = this.form.value.nombre;
            this.comunicado.descripcion = this.form.value.descripcion;
            this.comunicado.fechaCreacion = this.form.value.fechaCreacion;
            this.comunicado.usuario = usuarioSelect;
            this.comunicado.areaDeTrabajo=areaSelect;
            this.comunicado.grupoDeProyecto=grupoSelect;
            this.comunicado.active = true;
            if (this.edicion) {
              this.cS.update(this.comunicado).subscribe(() => {
                this.cS.list().subscribe((data) => {
                  this.cS.setList(data);
                });
              });
            } else {
              this.cS.insert(this.comunicado).subscribe((data) => {
                this.cS.list().subscribe((data) => {
                  this.cS.setList(data);
                });
              });
            }

            this.router.navigate(['comunicado']);
          } else {
            this.mensaje = 'Por favor complete todos los campos obligatorios.';
          }
        });
      });
    });
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idComunicado: new FormControl(data.idComunicado),
          nombre: new FormControl(data.titulo),
          descripcion: new FormControl(data.descripcion),
          fechaCreacion: new FormControl(data.fechaCreacion),
          usuario: new FormControl(data.usuario.idUsuario),
          areatrabajo: new FormControl(data.areaDeTrabajo.idAreaDeTrabajo),
          grupoproyecto: new FormControl(
            data.grupoDeProyecto.idGrupoDeProyecto
          ),
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
