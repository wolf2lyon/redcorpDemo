import { Component,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoDeProyecto } from 'src/app/models/grupo-proyecto';
import { MiembroEnGrupo } from 'src/app/models/miembro-grupo';
import { Proyecto } from 'src/app/models/proyecto';
import { GrupoDeProyectoService } from 'src/app/services/grupo-de-proyecto.service';
import { MiembrogrupoService } from 'src/app/services/miembrogrupo.service';
import { ProyectoService } from 'src/app/services/proyecto.service';


@Component({
  selector: 'app-listar-miembrogrupo',
  templateUrl: './listar-miembrogrupo.component.html',
  styleUrls: ['./listar-miembrogrupo.component.scss']
})
export class ListarMiembrogrupoComponent {
  miembrogrupo: MiembroEnGrupo = new MiembroEnGrupo();
  dataSource:MatTableDataSource<MiembroEnGrupo>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'miembroDeArea',
    'grupoDeProyecto',
    'funciones'
  ];
  constructor(private mS:MiembrogrupoService)
  {

  }

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      data = data.sort((a, b) => a.idMiembroEnGrupo - b.idMiembroEnGrupo);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getList().subscribe((data) => {
      data = data.sort((a, b) => a.idMiembroEnGrupo - b.idMiembroEnGrupo);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
  }


  eliminar(id:number){

    this.mS.listId(id).subscribe((proyecto)=>
    {
      this.miembrogrupo = proyecto
      this.miembrogrupo.active=false
      this.mS.update(this.miembrogrupo).subscribe(() => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });
    })
    
  }
}
