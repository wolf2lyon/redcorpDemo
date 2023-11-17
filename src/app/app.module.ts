import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { PanelComponent } from './components/panel/panel.component';
import { RolComponent } from './components/rol/rol.component';
import { ListarRolComponent } from './components/rol/listar-rol/listar-rol.component';
import { CreaeditaRolComponent } from './components/rol/creaedita-rol/creaedita-rol.component';
import { AreatrabajoComponent } from './components/areatrabajo/areatrabajo.component';
import { ListarAreatrabajoComponent } from './components/areatrabajo/listar-areatrabajo/listar-areatrabajo.component';
import { CreaeditaAreatrabajoComponent } from './components/areatrabajo/creaedita-areatrabajo/creaedita-areatrabajo.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { AuthInterceptor } from './interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListaUsuarioComponent } from './components/usuario/lista-usuario/lista-usuario.component';
import { CreaeditaUsuarioComponent } from './components/usuario/creaedita-usuario/creaedita-usuario.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { ListarProyectoComponent } from './components/proyecto/listar-proyecto/listar-proyecto.component';
import { CreaeditaProyectoComponent } from './components/proyecto/creaedita-proyecto/creaedita-proyecto.component';
import { ComunicadoComponent } from './components/comunicado/comunicado.component';
import { ListarComunicadoComponent } from './components/comunicado/listar-comunicado/listar-comunicado.component';
import { CreaeditaComunicadoComponent } from './components/comunicado/creaedita-comunicado/creaedita-comunicado.component';
import { GrupoDeProyectoComponent } from './components/grupo-de-proyecto/grupo-de-proyecto.component';
import { ListarGrupoDeProyectoComponent } from './components/grupo-de-proyecto/listar-grupo-de-proyecto/listar-grupo-de-proyecto.component';
import { CreaditaGrupoproyectoComponent } from './components/grupo-de-proyecto/creadita-grupoproyecto/creadita-grupoproyecto.component';
import { MiembroDeAreaComponent } from './components/miembro-de-area/miembro-de-area.component';
import { ListarMiembroareaComponent } from './components/miembro-de-area/listar-miembroarea/listar-miembroarea.component';
import { CreaeditaMiembroareaComponent } from './components/miembro-de-area/creaedita-miembroarea/creaedita-miembroarea.component';
import { MiembroGrupoComponent } from './components/miembro-grupo/miembro-grupo.component';
import { ListarMiembrogrupoComponent } from './components/miembro-grupo/listar-miembrogrupo/listar-miembrogrupo.component';
import { CreaeditaMiembrogrupoComponent } from './components/miembro-grupo/creaedita-miembrogrupo/creaedita-miembrogrupo.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { ListarTareaComponent } from './components/tarea/listar-tarea/listar-tarea.component';
import { CreaeditaTareaComponent } from './components/tarea/creaedita-tarea/creaedita-tarea.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { ListarComentarioComponent } from './components/comentario/listar-comentario/listar-comentario.component';
import { CreaeditaComentarioComponent } from './components/comentario/creaedita-comentario/creaedita-comentario.component';
import { TareaMiembroAreaComponent } from './components/tarea-miembro-area/tarea-miembro-area.component';
import { ListarTareaMiembroAreaComponent } from './components/tarea-miembro-area/listar-tarea-miembro-area/listar-tarea-miembro-area.component';
import { CreaeditaTareaMiembroAreaComponent } from './components/tarea-miembro-area/creaedita-tarea-miembro-area/creaedita-tarea-miembro-area.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { ToolsComponent } from './components/tools/tools.component';
import { Query1Component } from './components/tools/query1/query1.component';
import { Query2Component } from './components/tools/query2/query2.component';
import { Query3Component } from './components/tools/query3/query3.component';
import { Query4Component } from './components/tools/query4/query4.component';
import { Query5Component } from './components/tools/query5/query5.component';
import { Query6Component } from './components/tools/query6/query6.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PanelComponent,
    RolComponent,
    ListarRolComponent,
    CreaeditaRolComponent,
    AreatrabajoComponent,
    ListarAreatrabajoComponent,
    CreaeditaAreatrabajoComponent,
    NavbarComponent,
    UsuarioComponent,
    ListaUsuarioComponent,
    CreaeditaUsuarioComponent,
    ProyectoComponent,
    ListarProyectoComponent,
    CreaeditaProyectoComponent,
    ComunicadoComponent,
    ListarComunicadoComponent,
    CreaeditaComunicadoComponent,
    GrupoDeProyectoComponent,
    ListarGrupoDeProyectoComponent,
    CreaditaGrupoproyectoComponent,
    MiembroDeAreaComponent,
    ListarMiembroareaComponent,
    CreaeditaMiembroareaComponent,
    MiembroGrupoComponent,
    ListarMiembrogrupoComponent,
    CreaeditaMiembrogrupoComponent,
    TareaComponent,
    ListarTareaComponent,
    CreaeditaTareaComponent,
    ComentarioComponent,
    ListarComentarioComponent,
    CreaeditaComentarioComponent,
    TareaMiembroAreaComponent,
    ListarTareaMiembroAreaComponent,
    CreaeditaTareaMiembroAreaComponent,
    SidenavComponent,
    BodyComponent,
    SublevelMenuComponent,
    ToolsComponent,
    Query1Component,
    Query2Component,
    Query3Component,
    Query4Component,
    Query5Component,
    Query6Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
