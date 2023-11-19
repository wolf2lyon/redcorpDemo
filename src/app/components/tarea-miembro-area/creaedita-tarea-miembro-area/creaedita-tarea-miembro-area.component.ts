import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MiembroDeArea } from 'src/app/models/miembro-de-area';
import { Tarea } from 'src/app/models/tarea';
import { TareaMiembroArea } from 'src/app/models/tarea-miembro-area';
import { MiembroareaService } from 'src/app/services/miembroarea.service';
import { TareaMiembroAreaService } from 'src/app/services/tarea-miembro-area.service';
import { TareaService } from 'src/app/services/tarea.service';
@Component({
  selector: 'app-creaedita-tarea-miembro-area',
  templateUrl: './creaedita-tarea-miembro-area.component.html',
  styleUrls: ['./creaedita-tarea-miembro-area.component.scss']
})
export class CreaeditaTareaMiembroAreaComponent {
  form: FormGroup = new FormGroup({});
  tareaMiembroArea: TareaMiembroArea = new TareaMiembroArea();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaTareas: Tarea[] = [];
  listaMiembros:MiembroDeArea[]=[];
  constructor(
    private mS: MiembroareaService,
    private tS: TareaService,
    private taS: TareaMiembroAreaService,
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
      idTareaMiembroArea: [''],
      miembroDeArea: ['', Validators.required],
      tarea: ['', Validators.required],
    });
    this.mS.list().subscribe((data) => {
      const dataFilter = data.filter(item => item.active === true)
      this.listaMiembros = dataFilter;
    });
    this.tS.list().subscribe((data) => {
      const dataFilter = data.filter(item => item.active === true)
      this.listaTareas = dataFilter;
    });   
  }

  aceptar(): void {
    this.tS
      .listId(this.form.value.tarea)
      .subscribe((tareaSelect) => {
        this.mS.listId(this.form.value.miembroDeArea).subscribe((miembroSelect) => {
          if (this.form.valid) {
            this.tareaMiembroArea.idTareaMiembroArea = this.form.value.idTareaMiembroArea;
            this.tareaMiembroArea.miembroDeArea = miembroSelect;
            this.tareaMiembroArea.tarea = tareaSelect;
            this.tareaMiembroArea.active = true;
            if (this.edicion) {
              this.taS.update(this.tareaMiembroArea).subscribe(() => {
                this.taS.list().subscribe((data) => {
                  this.taS.setList(data);

                });
              });
            } else {
              this.taS.insert(this.tareaMiembroArea).subscribe((data) => {
                this.taS.list().subscribe((data) => {
                  this.taS.setList(data);
                });
              });
            }

            this.router.navigate(['tarea-miembro-area']);
          } else {
            this.mensaje = 'Por favor complete todos los campos obligatorios.';
          }
        });
      });
  }


  init() {
    if (this.edicion) {
      this.taS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idTareaMiembroArea: new FormControl(data.idTareaMiembroArea),
          miembroDeArea: new FormControl(data.miembroDeArea.idMiembroDeArea),
          tarea: new FormControl(data.tarea.idTarea),
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
