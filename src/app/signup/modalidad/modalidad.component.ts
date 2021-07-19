import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirestoreService } from '../../services/firestore.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-modalidad',
  templateUrl: './modalidad.component.html',
  styleUrls: ['./modalidad.component.css']
})
export class ModalidadComponent implements OnInit {
  
  nextPath: string = 'tarifa';
  previousPath: string = 'rama';

  // save firestore data
  modalidadesData: any[] = [];
  horariosData: any[] = [];

  formData: any = {
    modalidad: '',
    horario: ''
  }
  modalidadTaken: string = '';
  horarioTaken: string = '';

  constructor(
    private firestore: FirestoreService,
    private storage: StorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getData('modalidades');
    this.getData('horarios');

    // get storage data to recover already filled form when initializing
    this.storage.getStorage(this.formData);  
    
  }

  // retreive firestore data and add them in an array
  getData(path) {
    this.firestore.readFirestore(path).subscribe({
      next: (data: any) => {
        data.docs.forEach(doc => {
          eval('this.' + path + 'Data').push(doc.data()); // generate dynamic variable name with eval()
        });
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  goTo(path) {
    // save data to storage before leaving the page 
    this.storage.addStorage(this.formData);

    this.router.navigate(['/signup', path]);
  }

}
