import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CantidadGrupoProyecto } from 'src/app/models/cantidad-grupo-proyecto';
import { ComunicadoService } from 'src/app/services/comunicado.service';

@Component({
  selector: 'app-query1',
  templateUrl: './query1.component.html',
  styleUrls: ['./query1.component.scss']
})
export class Query1Component {

  cantidadComunicadosGrupoProyecto: CantidadGrupoProyecto = new CantidadGrupoProyecto();
  dataSource:MatTableDataSource<CantidadGrupoProyecto>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'nombre',
    'cantidadComunicados',
  ];

  constructor(private cS:ComunicadoService)
  {

  }

  ngOnInit(): void {
    this.cS.listquantityAnnouncementsGroupProjects().subscribe((data) => {
      data = data.sort((a, b) => a.cantidadComunicados - b.cantidadComunicados);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getquantityAnnouncementsGroupProjects().subscribe((data) => {
      data = data.sort((a, b) => a.cantidadComunicados - b.cantidadComunicados);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }



}
