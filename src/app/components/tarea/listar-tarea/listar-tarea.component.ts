import { Component,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Comunicado } from 'src/app/models/comunicado';
import { Proyecto } from 'src/app/models/proyecto';
import { Tarea } from 'src/app/models/tarea';
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';


@Component({
  selector: 'app-listar-tarea',
  templateUrl: './listar-tarea.component.html',
  styleUrls: ['./listar-tarea.component.scss']
})
export class ListarTareaComponent {
  tarea: Tarea = new Tarea();
  dataSource:MatTableDataSource<Tarea>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'nombre',
    'descripcion',
    'fechaLimite',
    'grupo',
    'proyecto',
    'fechaCreacion',
    'funciones'
  ];
  constructor(private tS:TareaService)
  {

  }

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      data = data.sort((a, b) => a.idTarea - b.idTarea);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getList().subscribe((data) => {
      data = data.sort((a, b) => a.idTarea - b.idTarea);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id:number){

    this.tS.listId(id).subscribe((tarea)=>
    {
      this.tarea = tarea
      this.tarea.active=false
      this.tS.update(this.tarea).subscribe(() => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
        });
      });
    })
    
  }
}
