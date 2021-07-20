import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { TarifaComponent } from './signup/tarifa/tarifa.component';
import { DatosComponent } from './signup/datos/datos.component';
import { DireccionComponent } from './signup/direccion/direccion.component';
import { ModalidadComponent } from './signup/modalidad/modalidad.component';
import { PagoComponent } from './signup/pago/pago.component';
import { RamaComponent } from './signup/rama/rama.component';
import { StartEndComponent } from './start-end/start-end.component';

const routes: Routes = [
  {
    path: '',
    component: StartEndComponent,
    pathMatch: 'full'
  },
  {
    path: 'startend/:status',
    component: StartEndComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
    children: [
      {
        path: '',
        component: RamaComponent,
        pathMatch: 'full'
      },
      {
        path: 'rama',
        component: RamaComponent
      },
      {
        path: 'modalidad',
        component: ModalidadComponent
      },
      {
        path: 'tarifa',
        component: TarifaComponent
      },
      {
        path: 'datos',
        component: DatosComponent
      },
      {
        path: 'direccion',
        component: DireccionComponent
      },
      {
        path: 'pago',
        component: PagoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
