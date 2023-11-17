import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-miembro-de-area',
  templateUrl: './miembro-de-area.component.html',
  styleUrls: ['./miembro-de-area.component.scss']
})
export class MiembroDeAreaComponent {
  constructor( public route:ActivatedRoute){

  }
}
