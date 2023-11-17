import { Component,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss']
})
export class ListaUsuarioComponent {
  usuario: Usuario = new Usuario();
  dataSource:MatTableDataSource<Usuario>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'nombre',
    'correo',
    'fechaNacimiento',
    'rol',
    'username',
    'contrasena',
    'funciones'
  ];
  constructor(private uS:UsuarioService)
  {

  }
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      data = data.sort((a, b) => a.idUsuario - b.idUsuario);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      data = data.sort((a, b) => a.idUsuario - b.idUsuario);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id:number){

    this.uS.listId(id).subscribe((usuario)=>
    {
      this.usuario = usuario
      this.usuario.active=false
      this.uS.update(this.usuario).subscribe(() => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
    })
    
  }
}
