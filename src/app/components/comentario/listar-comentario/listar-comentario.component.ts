import { Component,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
@Component({
  selector: 'app-listar-comentario',
  templateUrl: './listar-comentario.component.html',
  styleUrls: ['./listar-comentario.component.scss']
})
export class ListarComentarioComponent {
  comentario: Comentario = new Comentario();
  dataSource:MatTableDataSource<Comentario>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'comentario',
    'tarea',
    'funciones'
  ];
  constructor(private aC:ComentarioService)
  {

  }

  ngOnInit(): void {
    this.aC.list().subscribe((data) => {
      data = data.sort((a, b) => a.idComentario - b.idComentario);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
      console.log(data)
    });
    this.aC.getList().subscribe((data) => {
      data = data.sort((a, b) => a.idComentario - b.idComentario);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id:number){

    this.aC.listId(id).subscribe((comentario)=>
    {
      this.comentario = comentario
      this.comentario.active=false
      this.aC.update(this.comentario).subscribe(() => {
        this.aC.list().subscribe((data) => {
          this.aC.setList(data);
        });
      });
    })
    
  }
  

}
