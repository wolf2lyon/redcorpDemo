import { Component,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Comunicado } from 'src/app/models/comunicado';
import { Proyecto } from 'src/app/models/proyecto';
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { ProyectoService } from 'src/app/services/proyecto.service';


@Component({
  selector: 'app-listar-comunicado',
  templateUrl: './listar-comunicado.component.html',
  styleUrls: ['./listar-comunicado.component.scss']
})
export class ListarComunicadoComponent {
  comunicado: Comunicado = new Comunicado();
  dataSource:MatTableDataSource<Comunicado>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'nombre',
    'descripcion',
    'fechaCreacion',
    'usuario',
    'areatrabajo',
    'grupo',
    'funciones'
  ];
  constructor(private cS:ComunicadoService)
  {

  }
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      data = data.sort((a, b) => a.idComunicado - b.idComunicado);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      data = data.sort((a, b) => a.idComunicado - b.idComunicado);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id:number){

    this.cS.listId(id).subscribe((comunicado)=>
    {
      this.comunicado = comunicado
      this.comunicado.active=false
      this.cS.update(this.comunicado).subscribe(() => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
    })
    
  }
}
