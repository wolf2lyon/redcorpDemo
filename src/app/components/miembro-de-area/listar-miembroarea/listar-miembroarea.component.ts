import { Component,OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MiembroDeArea } from 'src/app/models/miembro-de-area';
import { MiembroareaService } from 'src/app/services/miembroarea.service';


@Component({
  selector: 'app-listar-miembroarea',
  templateUrl: './listar-miembroarea.component.html',
  styleUrls: ['./listar-miembroarea.component.scss']
})
export class ListarMiembroareaComponent {
  miembroarea: MiembroDeArea = new MiembroDeArea();
  dataSource:MatTableDataSource<MiembroDeArea>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'usuario',
    'areaDeTrabajo',
    'funciones'
  ];

  constructor(private mS:MiembroareaService)
  {

  }

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      data = data.sort((a, b) => a.idMiembroDeArea - b.idMiembroDeArea);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getList().subscribe((data) => {
      data = data.sort((a, b) => a.idMiembroDeArea - b.idMiembroDeArea);
      const dataFiltrados = data.filter(item => item.active === true);
      this.dataSource = new MatTableDataSource(dataFiltrados);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id:number){

    this.mS.listId(id).subscribe((miembroarea)=>
    {
      this.miembroarea = miembroarea
      this.miembroarea.active=false
      this.mS.update(this.miembroarea).subscribe(() => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });
    })
    
  }
}
