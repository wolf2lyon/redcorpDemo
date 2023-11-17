import { Component,OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
@Component({
  selector: 'app-creaedita-rol',
  templateUrl: './creaedita-rol.component.html',
  styleUrls: ['./creaedita-rol.component.scss']
})
export class CreaeditaRolComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  mensaje: string = '';
  id:number = 0;
  edicion:boolean  =false;
  

  constructor(
    private rS:RolService,
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
      idRol: [''],
      descripcion: ['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.rol.idRol = this.form.value.idRol;
      this.rol.descripcion = this.form.value.descripcion;
      this.rol.active = true; 
      if (this.edicion) {
        this.rS.update(this.rol).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['roles']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idRol: new FormControl(data.idRol),
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
