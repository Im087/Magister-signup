import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { RamaComponent } from './signup/rama/rama.component';
import { ModalidadComponent } from './signup/modalidad/modalidad.component';
import { TarifaComponent } from './signup/tarifa/tarifa.component';
import { DatosComponent } from './signup/datos/datos.component';
import { DireccionComponent } from './signup/direccion/direccion.component';
import { PagoComponent } from './signup/pago/pago.component';
import { StartEndComponent } from './start-end/start-end.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    RamaComponent,
    ModalidadComponent,
    TarifaComponent,
    DatosComponent,
    DireccionComponent,
    PagoComponent,
    StartEndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
