import { Component,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoDeProyecto } from 'src/app/models/grupo-proyecto';
import { MiembroEnGrupo } from 'src/app/models/miembro-grupo';
import { Proyecto } from 'src/app/models/proyecto';
import { TareaMiembroArea } from 'src/app/models/tarea-miembro-area';
import { GrupoDeProyectoService } from 'src/app/services/grupo-de-proyecto.service';
import { MiembrogrupoService } from 'src/app/services/miembrogrupo.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaMiembroAreaService } from 'src/app/services/tarea-miembro-area.service';

@Component({
  selector: 'app-listar-tarea-miembro-area',
  templateUrl: './listar-tarea-miembro-area.component.html',
  styleUrls: ['./listar-tarea-miembro-area.component.scss']
})
export class ListarTareaMiembroAreaComponent {
  tareamiembroarea: TareaMiembroArea = new TareaMiembroArea();
  dataSource:MatTableDataSource<TareaMiembroArea>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'miembroDeArea',
    'tarea',
    'funciones'
  ];

  constructor(private tS:TareaMiembroAreaService)
  {

  }

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      console.log(data)
      data = data.sort((a, b) => a.idTareaMiembroArea - b.idTareaMiembroArea);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getList().subscribe((data) => {
      data = data.sort((a, b) => a.idTareaMiembroArea - b.idTareaMiembroArea);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
  }


  eliminar(id:number){

    this.tS.listId(id).subscribe((proyecto)=>
    {
      this.tareamiembroarea = proyecto
      this.tareamiembroarea.active=false
      this.tS.update(this.tareamiembroarea).subscribe(() => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
        });
      });
    })
    
  }
}
