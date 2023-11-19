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
import { Proyecto } from 'src/app/models/proyecto';
import { Usuario } from 'src/app/models/usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-creaedita-proyecto',
  templateUrl: './creaedita-proyecto.component.html',
  styleUrls: ['./creaedita-proyecto.component.scss']
})
export class CreaeditaProyectoComponent {
  form: FormGroup = new FormGroup({});
  proyecto: Proyecto = new Proyecto();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listUsuarios: Usuario[] = [];
  // maxFecha: Date = moment().add(-1, 'days').toDate();
  // maxDate: Date = moment().subtract(1, 'days').toDate();
  maxDate = addDays(new Date(), -1);
  formattedMaxDate = format(this.maxDate, 'yyyy-MM-dd');
  constructor(
    private uS: UsuarioService,
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
      idProyecto: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      usuario: ['', Validators.required],
      fechaCreacion: ['', Validators.required]
    });
    this.uS.list().subscribe((data) => {
      const dataFilter = data.filter(item => item.active === true)
      this.listUsuarios = dataFilter;
    });
  }

  aceptar(): void {
    this.uS.listId(this.form.value.usuario).subscribe((usuarioSelect)=>{
      if (this.form.valid) {
        this.proyecto.idProyecto = this.form.value.idProyecto;
        this.proyecto.nombre = this.form.value.nombre;
        this.proyecto.descripcion = this.form.value.descripcion;
        this.proyecto.usuario = usuarioSelect ;
        this.proyecto.fechaCreacion=this.form.value.fechaCreacion;
        this.proyecto.active = true;
        if (this.edicion) {
          this.pS.update(this.proyecto).subscribe(() => {
            this.pS.list().subscribe((data) => {
              this.pS.setList(data);
            });
          });
        } else {
          this.pS.insert(this.proyecto).subscribe((data) => {
            this.pS.list().subscribe((data) => {
              this.pS.setList(data);
            });
          });
        }

        this.router.navigate(['proyecto']);
      } else {
        this.mensaje = 'Por favor complete todos los campos obligatorios.';
      }
    } )
   
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idProyecto: new FormControl(data.idProyecto),
          nombre: new FormControl(data.nombre),
          descripcion: new FormControl(data.descripcion),
          usuario: new FormControl(data.usuario.idUsuario),
          fechaCreacion: new FormControl(data.fechaCreacion),
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
