import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { addDays, format } from 'date-fns';
import { GrupoDeProyecto } from 'src/app/models/grupo-proyecto';
import { Proyecto } from 'src/app/models/proyecto';
import { Tarea } from 'src/app/models/tarea';
import { GrupoDeProyectoService } from 'src/app/services/grupo-de-proyecto.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
@Component({
  selector: 'app-creaedita-tarea',
  templateUrl: './creaedita-tarea.component.html',
  styleUrls: ['./creaedita-tarea.component.scss']
})
export class CreaeditaTareaComponent {
  form: FormGroup = new FormGroup({});
  tarea: Tarea = new Tarea();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listGrupos: GrupoDeProyecto[] = [];
  listProyecto: Proyecto[] = [];
  maxDate = addDays(new Date(), -1);
  formattedMaxDate = format(this.maxDate, 'yyyy-MM-dd');
  constructor(
    private pS: ProyectoService,
    private gS: GrupoDeProyectoService,
    private tS: TareaService,
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
      idTarea: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaLimite: ['', Validators.required],
      grupoDeProyecto: ['', Validators.required],
      proyecto: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    });
    this.pS.list().subscribe((data) => {
      this.listProyecto = data;
    });
    this.gS.list().subscribe((data) => {
      this.listGrupos = data;
    });
  }

  aceptar(): void {
      this.pS.listId(this.form.value.proyecto).subscribe((proyectSelect) => {
        this.gS.listId(this.form.value.grupoDeProyecto).subscribe((grupoSelect) => {
          if (this.form.valid) {
            this.tarea.idTarea = this.form.value.idTarea;
            this.tarea.nombre = this.form.value.nombre;
            this.tarea.descripcion = this.form.value.descripcion;
            this.tarea.fechaLimite = this.form.value.fechaLimite;
            this.tarea.grupoDeProyecto = grupoSelect;
            this.tarea.proyecto=proyectSelect;
            this.tarea.fechaCreacion=this.form.value.fechaCreacion;
            this.tarea.active = true;
            if (this.edicion) {
              this.tS.update(this.tarea).subscribe(() => {
                this.tS.list().subscribe((data) => {
                  this.tS.setList(data);
                });
              });
            } else {
              this.tS.insert(this.tarea).subscribe((data) => {
                this.tS.list().subscribe((data) => {
                  this.tS.setList(data);
                });
              });
            }

            this.router.navigate(['tarea']);
          } else {
            this.mensaje = 'Por favor complete todos los campos obligatorios.';
          }
        });
      });
  }

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idTarea: new FormControl(data.idTarea),
          nombre: new FormControl(data.nombre),
          descripcion: new FormControl(data.descripcion),
          fechaLimite: new FormControl(data.fechaLimite),
          grupoDeProyecto: new FormControl(data.grupoDeProyecto.idGrupoDeProyecto),
          proyecto: new FormControl(data.proyecto.idProyecto),
          fechaCreacion: new FormControl(
            data.fechaCreacion
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
