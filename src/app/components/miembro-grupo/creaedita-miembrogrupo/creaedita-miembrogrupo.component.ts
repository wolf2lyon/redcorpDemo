import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GrupoDeProyecto } from 'src/app/models/grupo-proyecto';
import { MiembroDeArea } from 'src/app/models/miembro-de-area';
import { MiembroEnGrupo } from 'src/app/models/miembro-grupo';
import { GrupoDeProyectoService } from 'src/app/services/grupo-de-proyecto.service';
import { MiembroareaService } from 'src/app/services/miembroarea.service';
import { MiembrogrupoService } from 'src/app/services/miembrogrupo.service';

@Component({
  selector: 'app-creaedita-miembrogrupo',
  templateUrl: './creaedita-miembrogrupo.component.html',
  styleUrls: ['./creaedita-miembrogrupo.component.scss']
})
export class CreaeditaMiembrogrupoComponent {
  form: FormGroup = new FormGroup({});
  miembroengrupo: MiembroEnGrupo = new MiembroEnGrupo();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaMiembros: MiembroDeArea[] = [];
  listaGrupos:GrupoDeProyecto[]=[];
  constructor(
    private mA: MiembroareaService,
    private mgS: MiembrogrupoService,
    private gS: GrupoDeProyectoService,
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
      idMiembroEnGrupo: [''],
      miembroDeArea: ['', Validators.required],
      grupoDeProyecto: ['', Validators.required],
    });
    this.mA.list().subscribe((data) => {
      const dataFilter = data.filter(item => item.active === true)
      this.listaMiembros = dataFilter;
    });
    this.gS.list().subscribe((data) => {
      const dataFilter = data.filter(item => item.active === true)
      this.listaGrupos = dataFilter;
    });   
  }

  aceptar(): void {
    this.mA
      .listId(this.form.value.miembroDeArea)
      .subscribe((miembroArea) => {
        this.gS.listId(this.form.value.grupoDeProyecto).subscribe((grupoProyecto) => {
          if (this.form.valid) {
            this.miembroengrupo.idMiembroEnGrupo = this.form.value.idMiembroEnGrupo;
            this.miembroengrupo.miembroDeArea = miembroArea;
            this.miembroengrupo.grupoDeProyecto = grupoProyecto;
            this.miembroengrupo.active = true;
            if (this.edicion) {
              this.mgS.update(this.miembroengrupo).subscribe(() => {
                this.mgS.list().subscribe((data) => {
                  this.mgS.setList(data);

                });
              });
            } else {
              this.mgS.insert(this.miembroengrupo).subscribe((data) => {
                this.mgS.list().subscribe((data) => {
                  this.mgS.setList(data);
                });
              });
            }

            this.router.navigate(['miembrogrupo']);
          } else {
            this.mensaje = 'Por favor complete todos los campos obligatorios.';
          }
        });
      });
  }

  init() {
    if (this.edicion) {
      this.mgS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idMiembroEnGrupo: new FormControl(data.idMiembroEnGrupo),
          miembroDeArea: new FormControl(data.miembroDeArea.idMiembroDeArea),
          grupoDeProyecto: new FormControl(data.grupoDeProyecto.idGrupoDeProyecto),
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
