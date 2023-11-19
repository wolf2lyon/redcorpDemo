import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comentario } from 'src/app/models/comentario';
import { Tarea } from 'src/app/models/tarea';
import { ComentarioService } from 'src/app/services/comentario.service';
import { TareaService } from 'src/app/services/tarea.service';
@Component({
  selector: 'app-creaedita-comentario',
  templateUrl: './creaedita-comentario.component.html',
  styleUrls: ['./creaedita-comentario.component.scss']
})
export class CreaeditaComentarioComponent {
  form: FormGroup = new FormGroup({});
  comentario: Comentario = new Comentario();
  mensaje: string = '';
  id:number = 0;
  edicion:boolean  =false;
  listaTareas: Tarea[] = [];
  constructor(
    private aC:ComentarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tS:TareaService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idComentario: [''],
      comentario: ['', Validators.required],
      tarea:['', Validators.required],

    });
    this.tS.list().subscribe((data) => {
      const dataFilter = data.filter(item => item.active === true)
      this.listaTareas = dataFilter;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.comentario.idComentario = this.form.value.idComentario;
      this.comentario.comentario = this.form.value.comentario;
      this.comentario.tarea.idTarea = this.form.value.tarea;
      this.comentario.active = true; 
      if (this.edicion) {
        this.aC.update(this.comentario).subscribe(() => {
          this.aC.list().subscribe((data) => {
            this.aC.setList(data);
          });
        });
      } else {
        this.aC.insert(this.comentario).subscribe((data) => {
          this.aC.list().subscribe((data) => {
            this.aC.setList(data);
          });
        });
      }
      this.router.navigate(['comentario']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  init() {
    if (this.edicion) {
      this.aC.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idComentario: new FormControl(data.idComentario),
          comentario: new FormControl(data.comentario),
          tarea: new FormControl(data.tarea.idTarea)
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
