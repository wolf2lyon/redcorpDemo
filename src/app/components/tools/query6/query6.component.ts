import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Proyecto } from 'src/app/models/proyecto';
import { UsuarioProject } from 'src/app/models/usuarioProyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-query6',
  templateUrl: './query6.component.html',
  styleUrls: ['./query6.component.scss']
})
export class Query6Component {
  idProject:number=0
  listProyectos:Proyecto[] =[]
  nombre:string = ""
  descripcion:string =""
  usuarioProject: UsuarioProject = new UsuarioProject();
  dataSource:MatTableDataSource<UsuarioProject>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'idProyecto',
    'nombreUsuario',
    'nombreProyecto',
    'rolUsuario',
    'fechaCreacion'
  ];
  constructor(private uS:UsuarioService,private pS:ProyectoService){

  }

  ngOnInit(): void {
    this.pS.list().subscribe((data)=>{
      this.listProyectos = data;
    })
    this.uS.listUserProject(this.idProject).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getlistUserProject().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  onSelectionChange(event:any){
    this.pS.listId(event.value).subscribe((project) => {
      this.idProject=project.idProyecto
      this.nombre = project.nombre
      this.descripcion = project.descripcion
    })
  }

  onClick(){
    this.uS.listUserProject(this.idProject).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
