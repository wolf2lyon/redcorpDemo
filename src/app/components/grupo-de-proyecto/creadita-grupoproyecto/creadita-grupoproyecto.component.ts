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
import { GrupoDeProyecto } from 'src/app/models/grupo-proyecto';
import { Proyecto } from 'src/app/models/proyecto';
import { GrupoDeProyectoService } from 'src/app/services/grupo-de-proyecto.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-creadita-grupoproyecto',
  templateUrl: './creadita-grupoproyecto.component.html',
  styleUrls: ['./creadita-grupoproyecto.component.scss']
})
export class CreaditaGrupoproyectoComponent {
  form: FormGroup = new FormGroup({});
  grupoProyecto: GrupoDeProyecto = new GrupoDeProyecto();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaProyecto: Proyecto[] = [];
  // maxFecha: Date = moment().add(-1, 'days').toDate();
  // maxDate: Date = moment().subtract(1, 'days').toDate();
  maxDate = addDays(new Date(), -1);
  formattedMaxDate = format(this.maxDate, 'yyyy-MM-dd');
  constructor(
    private gpS: GrupoDeProyectoService,
    private pS: ProyectoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idGrupoDeProyecto: [''],
      nombre: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      proyecto: ['', Validators.required]
    });
    this.pS.list().subscribe((data) => {
      const dataFilter = data.filter(item => item.active === true)
      this.listaProyecto = data;
    });
  }

  aceptar(): void {
    this.pS.listId(this.form.value.proyecto).subscribe((proyectoSelect)=>{
      if (this.form.valid) {
        this.grupoProyecto.idGrupoDeProyecto = this.form.value.idGrupoDeProyecto;
        this.grupoProyecto.nombre = this.form.value.nombre;
        this.grupoProyecto.fechaCreacion = this.form.value.fechaCreacion;
        this.grupoProyecto.proyecto = proyectoSelect ;
        this.grupoProyecto.active = true;
        if (this.edicion) {
          this.gpS.update(this.grupoProyecto).subscribe(() => {
            this.gpS.list().subscribe((data) => {
              this.gpS.setList(data);
            });
          });
        } else {
          this.gpS.insert(this.grupoProyecto).subscribe((data) => {
            this.gpS.list().subscribe((data) => {
              this.gpS.setList(data);
            });
          });
        }

        this.router.navigate(['grupo-proyecto']);
      } else {
        this.mensaje = 'Por favor complete todos los campos obligatorios.';
      }
    } )
   
  }

  init() {
    if (this.edicion) {
      this.gpS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idGrupoDeProyecto: new FormControl(data.idGrupoDeProyecto),
          nombre: new FormControl(data.nombre),
          fechaCreacion: new FormControl(data.fechaCreacion),
          proyecto: new FormControl(data.proyecto.idProyecto),
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
