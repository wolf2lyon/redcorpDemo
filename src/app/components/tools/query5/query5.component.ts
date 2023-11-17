import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MiembroDeArea } from 'src/app/models/miembro-de-area';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioAreaTrabajo } from 'src/app/models/usuario-area-trabajo';
import { AreadetrabajoService } from 'src/app/services/areadetrabajo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-query5',
  templateUrl: './query5.component.html',
  styleUrls: ['./query5.component.scss']
})
export class Query5Component {
  idUser:number=0
  listaUsuarios:Usuario[] =[]
  nombre:string = ""
  correo:string =""
  tareamiembroarea: UsuarioAreaTrabajo = new UsuarioAreaTrabajo();
  dataSource:MatTableDataSource<UsuarioAreaTrabajo>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'areaTrabajo',
  ];
  constructor(private uS:UsuarioService,private utS:AreadetrabajoService){

  }

  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.listaUsuarios = data;
    })
    this.utS.listAreaWorkUser(this.idUser).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.utS.getlistAreaWorkUser().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  onSelectionChange(event:any){
    this.uS.listId(event.value).subscribe((usuario) => {
      this.idUser=usuario.idUsuario
      this.nombre = usuario.nombre
      this.correo = usuario.correo
    })
  }

  onClick(){
    this.utS.listAreaWorkUser(this.idUser).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
