import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComentarioTarea } from 'src/app/models/comentarios-tarea';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-query3',
  templateUrl: './query3.component.html',
  styleUrls: ['./query3.component.scss']
})
export class Query3Component {
  cantidadComunicadosGrupoProyecto: ComentarioTarea = new ComentarioTarea();
  dataSource:MatTableDataSource<ComentarioTarea>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'cantidadComentario',
    'nombreTarea',
  ];

  constructor(private cS:ComentarioService)
  {

  }

  ngOnInit(): void {
    this.cS.listQuantityAnnouncementsTask().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getQuantityAnnouncementsTask().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
