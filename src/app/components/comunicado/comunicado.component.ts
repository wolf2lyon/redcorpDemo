import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-comunicado',
  templateUrl: './comunicado.component.html',
  styleUrls: ['./comunicado.component.scss']
})
export class ComunicadoComponent {
  constructor( public route:ActivatedRoute){

  }
}
