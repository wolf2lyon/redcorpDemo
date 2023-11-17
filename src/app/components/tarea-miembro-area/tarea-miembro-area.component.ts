import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tarea-miembro-area',
  templateUrl: './tarea-miembro-area.component.html',
  styleUrls: ['./tarea-miembro-area.component.scss']
})
export class TareaMiembroAreaComponent {
  constructor( public route:ActivatedRoute){

  }
}
