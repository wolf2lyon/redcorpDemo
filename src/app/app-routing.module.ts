import { NgModule, Query } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guard/auth.guard';
import { PanelComponent } from './components/panel/panel.component';
import { RolComponent } from './components/rol/rol.component';
import { CreaeditaAreatrabajoComponent } from './components/areatrabajo/creaedita-areatrabajo/creaedita-areatrabajo.component';
import { CreaeditaRolComponent } from './components/rol/creaedita-rol/creaedita-rol.component';
import { AreatrabajoComponent } from './components/areatrabajo/areatrabajo.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditaUsuarioComponent } from './components/usuario/creaedita-usuario/creaedita-usuario.component';
import { CreaeditaProyectoComponent } from './components/proyecto/creaedita-proyecto/creaedita-proyecto.component';
import { Proyecto } from './models/proyecto';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { ComunicadoComponent } from './components/comunicado/comunicado.component';
import { CreaeditaComunicadoComponent } from './components/comunicado/creaedita-comunicado/creaedita-comunicado.component';
import { MiembroDeArea } from './models/miembro-de-area';
import { CreaeditaMiembroareaComponent } from './components/miembro-de-area/creaedita-miembroarea/creaedita-miembroarea.component';
import { MiembroGrupoComponent } from './components/miembro-grupo/miembro-grupo.component';
import { CreaeditaMiembrogrupoComponent } from './components/miembro-grupo/creaedita-miembrogrupo/creaedita-miembrogrupo.component';
import { GrupoDeProyecto } from './models/grupo-proyecto';
import { CreaditaGrupoproyectoComponent } from './components/grupo-de-proyecto/creadita-grupoproyecto/creadita-grupoproyecto.component';
import { Tarea } from './models/tarea';
import { TareaComponent } from './components/tarea/tarea.component';
import { CreaeditaTareaComponent } from './components/tarea/creaedita-tarea/creaedita-tarea.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { CreaeditaComentarioComponent } from './components/comentario/creaedita-comentario/creaedita-comentario.component';
import { TareaMiembroArea } from './models/tarea-miembro-area';
import { GrupoDeProyectoComponent } from './components/grupo-de-proyecto/grupo-de-proyecto.component';
import { MiembroDeAreaComponent } from './components/miembro-de-area/miembro-de-area.component';
import { TareaMiembroAreaComponent } from './components/tarea-miembro-area/tarea-miembro-area.component';
import { CreaeditaTareaMiembroAreaComponent } from './components/tarea-miembro-area/creaedita-tarea-miembro-area/creaedita-tarea-miembro-area.component';
import { rolAdminGuard } from './guard/rol-admin.guard';
import { rolEmploGuard } from './guard/rol-emplo.guard';
import { Query1Component } from './components/tools/query1/query1.component';
import { Query2Component } from './components/tools/query2/query2.component';
import { Query3Component } from './components/tools/query3/query3.component';
import { Query4Component } from './components/tools/query4/query4.component';
import { Query5Component } from './components/tools/query5/query5.component';
import { Query6Component } from './components/tools/query6/query6.component';
import { ToolsComponent } from './components/tools/tools.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: PanelComponent, canActivate: [rolAdminGuard] },
  {
    path: 'areaTrabajo',
    component: AreatrabajoComponent,
    children: [
      { path: 'nuevo', component: CreaeditaAreatrabajoComponent },
      { path: 'ediciones/:id', component: CreaeditaAreatrabajoComponent },
    ],
    canActivate: [rolEmploGuard],
  },
  {
    path: 'roles',
    component: RolComponent,
    children: [
      { path: 'nuevo', component: CreaeditaRolComponent },
      { path: 'ediciones/:id', component: CreaeditaRolComponent },
    ],
    canActivate: [rolAdminGuard],
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaUsuarioComponent },
      { path: 'ediciones/:id', component: CreaeditaUsuarioComponent },
    ],
    canActivate: [rolAdminGuard],
  },
  {
    path: 'proyecto',
    component: ProyectoComponent,
    children: [
      { path: 'nuevo', component: CreaeditaProyectoComponent },
      { path: 'ediciones/:id', component: CreaeditaProyectoComponent },
    ],
    canActivate: [rolAdminGuard],
  },
  {
    path: 'comunicado',
    component: ComunicadoComponent,
    children: [
      { path: 'nuevo', component: CreaeditaComunicadoComponent },
      { path: 'ediciones/:id', component: CreaeditaComunicadoComponent },
    ],
    canActivate: [rolEmploGuard],
  },
  {
    path: 'miembrodearea',
    component: MiembroDeAreaComponent,
    children: [
      { path: 'nuevo', component: CreaeditaMiembroareaComponent },
      { path: 'ediciones/:id', component: CreaeditaMiembroareaComponent },
    ],
    canActivate: [rolEmploGuard],
  },
  {
    path: 'miembrogrupo',
    component: MiembroGrupoComponent,
    children: [
      { path: 'nuevo', component: CreaeditaMiembrogrupoComponent },
      { path: 'ediciones/:id', component: CreaeditaMiembrogrupoComponent },
    ],
    canActivate: [rolAdminGuard],
  },
  {
    path: 'grupo-proyecto',
    component: GrupoDeProyectoComponent,
    children: [
      { path: 'nuevo', component: CreaditaGrupoproyectoComponent },
      { path: 'ediciones/:id', component: CreaditaGrupoproyectoComponent },
    ],
    canActivate: [rolAdminGuard],
  },
  {
    path: 'tarea',
    component: TareaComponent,
    children: [
      { path: 'nuevo', component: CreaeditaTareaComponent },
      { path: 'ediciones/:id', component: CreaeditaTareaComponent },
    ],
    canActivate: [rolEmploGuard],
  },
  {
    path: 'comentario',
    component: ComentarioComponent,
    children: [
      { path: 'nuevo', component: CreaeditaComentarioComponent },
      { path: 'ediciones/:id', component: CreaeditaComentarioComponent },
    ],
    canActivate: [rolAdminGuard],
  },
  {
    path: 'tarea-miembro-area',
    component: TareaMiembroAreaComponent,
    children: [
      { path: 'nuevo', component: CreaeditaTareaMiembroAreaComponent },
      { path: 'ediciones/:id', component: CreaeditaTareaMiembroAreaComponent },
    ],
    canActivate: [rolAdminGuard],
  },
  {
    path: 'tools',
    component: ToolsComponent,
    children: [
      {
        path: 'query1',
        component: Query1Component,
      },
      {
        path: 'query2',
        component: Query2Component,
      },
      {
        path: 'query3',
        component: Query3Component,
      },
      {
        path: 'query4',
        component: Query4Component,
      },
      {
        path: 'query5',
        component: Query5Component,
      },
      {
        path: 'query6',
        component: Query6Component,
      },
    ],
  },

  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
