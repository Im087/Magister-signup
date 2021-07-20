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
  tryGo: boolean = false; // true means that the user has tried to go next
  allValid: boolean; // true means that all inputs are valid

  flag: boolean;

  // save client data in this object
  formData: any = {
    matriculaID: 1,
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
    console.log(this.formData);
    
  }

  // check each entry of formData
  validate() {
    for(let i in this.formData) {
      if(!this.formData[i]) {
        this.allValid = false;
        return;
      }
    }

    this.allValid = true;
  }

  submit() {
    // change the status
    this.tryGo = true;

    this.validate();

    // if whole formData is valid, submit data to firestore
    if(this.allValid == true) {
      this.firestore.readFirestore('matriculas').subscribe({
        next: (data: any) => {
          // get document count from firestore to calculate the ID for this submit
          this.formData.matriculaID = data.docs.length + 1;
          // submit formData to firestore
          this.firestore.createFirestore(this.formData).then(() => {
            // remove all storage data from the browser
            for(let i in this.formData) {
              window.localStorage.removeItem(i);
            }
            
            alert('Matrícula enviada con éxito');
            
          }).catch((err) => {
            console.log(err);
          });
        }
      });

    } else {
      alert('Formulario no completado');
    }

  }

}
