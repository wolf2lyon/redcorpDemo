import { Component,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';


@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.scss']
})
export class ListarProyectoComponent {
  proyecto: Proyecto = new Proyecto();
  dataSource:MatTableDataSource<Proyecto>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'nombre',
    'descripcion',
    'usuario',
    'fechaCreacion',
    'funciones'
  ];
  constructor(private pS:ProyectoService)
  {

  }
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      data = data.sort((a, b) => a.idProyecto - b.idProyecto);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      data = data.sort((a, b) => a.idProyecto - b.idProyecto);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id:number){

    this.pS.listId(id).subscribe((proyecto)=>
    {
      this.proyecto = proyecto
      this.proyecto.active=false
      this.pS.update(this.proyecto).subscribe(() => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
      });
    })
    
  }
}
