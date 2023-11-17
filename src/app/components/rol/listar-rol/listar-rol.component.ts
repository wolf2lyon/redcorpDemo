import { Component,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
@Component({
  selector: 'app-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.scss']
})
export class ListarRolComponent implements OnInit {
  rol: Rol = new Rol();
  dataSource:MatTableDataSource<Rol>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'descripcion',
    'funciones'
  ];

  constructor(private rS:RolService)
  {

  }
  
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      data = data.sort((a, b) => a.idRol - b.idRol);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      data = data.sort((a, b) => a.idRol - b.idRol);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id:number){

    this.rS.listId(id).subscribe((rol)=>
    {
      this.rol = rol
      this.rol.active=false
      this.rS.update(this.rol).subscribe(() => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
    })
    
  }
}
