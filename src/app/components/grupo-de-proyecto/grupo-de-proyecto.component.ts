import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grupo-de-proyecto',
  templateUrl: './grupo-de-proyecto.component.html',
  styleUrls: ['./grupo-de-proyecto.component.scss']
})
export class GrupoDeProyectoComponent {
  constructor( public route:ActivatedRoute){

  }
}
