import { Component,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AreaDeTrabajo } from 'src/app/models/areadetrabajo';
import { AreadetrabajoService } from 'src/app/services/areadetrabajo.service';

@Component({
  selector: 'app-listar-areatrabajo',
  templateUrl: './listar-areatrabajo.component.html',
  styleUrls: ['./listar-areatrabajo.component.scss']
})
export class ListarAreatrabajoComponent {
  areaTrabajo: AreaDeTrabajo = new AreaDeTrabajo();
  dataSource:MatTableDataSource<AreaDeTrabajo>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'nombre',
    'descripcion',
    'funciones'
  ];
  constructor(private as:AreadetrabajoService)
  {

  }

  ngOnInit(): void {
    this.as.list().subscribe((data) => {
      data = data.sort((a, b) => a.idAreaDeTrabajo - b.idAreaDeTrabajo);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
    this.as.getList().subscribe((data) => {
      data = data.sort((a, b) => a.idAreaDeTrabajo - b.idAreaDeTrabajo);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id:number){

    this.as.listId(id).subscribe((areadetrabajo)=>
    {
      this.areaTrabajo = areadetrabajo
      this.areaTrabajo.active=false
      this.as.update(this.areaTrabajo).subscribe(() => {
        this.as.list().subscribe((data) => {
          this.as.setList(data);
        });
      });
    })
    
  }
}
