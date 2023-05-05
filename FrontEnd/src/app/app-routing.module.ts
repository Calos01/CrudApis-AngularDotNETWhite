import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoMascotaComponent } from './components/listado-mascota/listado-mascota.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';

const routes: Routes = [

  {path:'', redirectTo:'ListadoMascota', pathMatch:'full'},
  {path:'ListadoMascota',component:ListadoMascotaComponent},
  {path:'VerMascota/:id',component:VerMascotaComponent},
  {path:'editarmascota/:id',component:AgregarEditarMascotaComponent},
  {path:'agregarmascota',component:AgregarEditarMascotaComponent},
  {path:'**', redirectTo:'ListadoMascota', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
