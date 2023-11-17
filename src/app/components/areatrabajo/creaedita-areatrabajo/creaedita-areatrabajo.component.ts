import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AreaDeTrabajo } from 'src/app/models/areadetrabajo';
import { AreadetrabajoService } from 'src/app/services/areadetrabajo.service';
@Component({
  selector: 'app-creaedita-areatrabajo',
  templateUrl: './creaedita-areatrabajo.component.html',
  styleUrls: ['./creaedita-areatrabajo.component.scss']
})
export class CreaeditaAreatrabajoComponent {
  form: FormGroup = new FormGroup({});
  areaTrabajo: AreaDeTrabajo = new AreaDeTrabajo();
  mensaje: string = '';
  id:number = 0;
  edicion:boolean  =false;
  constructor(
    private aS:AreadetrabajoService,
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
      idAreaDeTrabajo: [''],
      nombre: ['', Validators.required],
      descripcion:['', Validators.required],

    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.areaTrabajo.idAreaDeTrabajo = this.form.value.idAreaDeTrabajo;
      this.areaTrabajo.nombre = this.form.value.nombre;
      this.areaTrabajo.descripcion = this.form.value.descripcion;
      this.areaTrabajo.active = true; 
      if (this.edicion) {
        this.aS.update(this.areaTrabajo).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.areaTrabajo).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['areaTrabajo']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }
  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idAreaDeTrabajo: new FormControl(data.idAreaDeTrabajo),
          nombre: new FormControl(data.nombre),
          descripcion: new FormControl(data.descripcion)
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
