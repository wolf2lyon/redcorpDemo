import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MiembroDeArea } from 'src/app/models/miembro-de-area';
import { TareaMiembroArea } from 'src/app/models/tarea-miembro-area';
import { TareaPorMiembro } from 'src/app/models/tarea-por-miembro';
import { MiembroareaService } from 'src/app/services/miembroarea.service';
import { TareaMiembroAreaService } from 'src/app/services/tarea-miembro-area.service';

@Component({
  selector: 'app-query4',
  templateUrl: './query4.component.html',
  styleUrls: ['./query4.component.scss']
})
export class Query4Component implements OnInit {
  idMiembroArea:number=0
  listaMiembroAreas:MiembroDeArea[] =[]
  miembroArea=new MiembroDeArea();
  nombre:string = ""
  areaTrabajo:string =""
  tareamiembroarea: TareaPorMiembro = new TareaPorMiembro();
  dataSource:MatTableDataSource<TareaPorMiembro>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns:string[] = [
    'codigo',
    'nombre',
    'descripcion',
  ];
  constructor(private mS:MiembroareaService,private tS:TareaMiembroAreaService){

  }
  ngOnInit(): void {
    this.mS.list().subscribe((data)=>{
      this.listaMiembroAreas = data;
    })
    this.tS.listTaskToMember(this.idMiembroArea).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getlistTaskToMember().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  onSelectionChange(event:any){
    this.mS.listId(event.value).subscribe((miembroArea) => {
      this.idMiembroArea=miembroArea.idMiembroDeArea
      this.nombre = miembroArea.usuario.nombre
      this.areaTrabajo = miembroArea.areaDeTrabajo.nombre
    })
  }

  onClick(){
    this.tS.listTaskToMember(this.idMiembroArea).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}
