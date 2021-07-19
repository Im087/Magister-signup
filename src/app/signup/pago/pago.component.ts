import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirestoreService } from '../../services/firestore.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  nextPath: string = 'pago';
  previousPath: string = 'direccion';

  flag: boolean;

  // save client data in this object
  formData: any = {
    matriculaID: 0,
    rama: '',
    provincia: '',
    antiguoAlumno: '',
    modalidad: '',
    horario: '',
    tarifa: '',
    nombre: '',
    dni: '',
    movil: '',
    email: '',
    comunidad: '',
    direccion: '',
    localidad: '',
    cp: '',
    legal: '',
    proteccion: '',
    pago: '',
    recomendado: '',
  };

  constructor(
    private firestore: FirestoreService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // get storage data to recover already filled form when initializing
    this.storage.getStorage(this.formData);
  }

  goTo(path) {
    // save data to storage before leaving the page 
    this.storage.addStorage(this.formData);

    this.router.navigate(['/signup', path]);
  }

  submit() {
    this.firestore.readFirestore('matriculas').subscribe({
      next: (data: any) => {
        // get document count from firestore to calculate the ID for this submit
        this.formData.matriculaID = data.docs.length + 1;
        // submit formData to firestore
        this.firestore.createFirestore(this.formData).then(() => {
          console.log('data sumbitted');
        }).catch((err) => {
          console.log(err);
        });
      }
    });

  }

}
