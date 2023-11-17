import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DescripcionTareaProyecto } from 'src/app/models/descripcion-tarea-proyecto';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-query2',
  templateUrl: './query2.component.html',
  styleUrls: ['./query2.component.scss']
})
export class Query2Component {

  cantidadComunicadosGrupoProyecto: DescripcionTareaProyecto = new DescripcionTareaProyecto();
  dataSource:MatTableDataSource<DescripcionTareaProyecto>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'descripcionTarea',
    'nombreProyecto',
  ];

  constructor(private tS:TareaService)
  {

  }

  ngOnInit(): void {
    this.tS.listDescriptionTaskProject().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getlistDescriptionTaskProject().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }



}
