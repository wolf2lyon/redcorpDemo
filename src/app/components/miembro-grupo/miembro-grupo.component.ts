import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-miembro-grupo',
  templateUrl: './miembro-grupo.component.html',
  styleUrls: ['./miembro-grupo.component.scss']
})
export class MiembroGrupoComponent {
  constructor( public route:ActivatedRoute){

  }
}
