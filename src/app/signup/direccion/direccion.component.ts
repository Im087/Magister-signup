import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirestoreService } from '../../services/firestore.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

  nextPath: string = 'pago';
  previousPath: string = 'datos';

  // save firestore data
  comunidadesData: any[] = [];

  formData: any = {
    comunidad: '',
    direccion: '',
    localidad: '',
    provincia: '',
    cp: '',
    legal: '',
    proteccion: ''
  }

  comunidadTaken: string = '';

  constructor(
    private firestore: FirestoreService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData('comunidades');
    
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
