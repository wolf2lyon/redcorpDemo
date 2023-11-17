import { Component,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoDeProyecto } from 'src/app/models/grupo-proyecto';
import { GrupoDeProyectoService } from 'src/app/services/grupo-de-proyecto.service';

@Component({
  selector: 'app-listar-grupo-de-proyecto',
  templateUrl: './listar-grupo-de-proyecto.component.html',
  styleUrls: ['./listar-grupo-de-proyecto.component.scss']
})
export class ListarGrupoDeProyectoComponent {
  grupoproyecto: GrupoDeProyecto = new GrupoDeProyecto();
  dataSource:MatTableDataSource<GrupoDeProyecto>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'nombre',
    'fechaCreacion',
    'proyecto',
    'funciones'
  ];
  constructor(private gS:GrupoDeProyectoService)
  {

  }

  ngOnInit(): void {
    this.gS.list().subscribe((data) => {
      data = data.sort((a, b) => a.idGrupoDeProyecto - b.idGrupoDeProyecto);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
    this.gS.getList().subscribe((data) => {
      data = data.sort((a, b) => a.idGrupoDeProyecto - b.idGrupoDeProyecto);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id:number){

    this.gS.listId(id).subscribe((grupoproyecto)=>
    {
      this.grupoproyecto = grupoproyecto
      this.grupoproyecto.active=false
      this.gS.update(this.grupoproyecto).subscribe(() => {
        this.gS.list().subscribe((data) => {
          this.gS.setList(data);
        });
      });
    })
    
  }
}
