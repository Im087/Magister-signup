import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import { FirestoreService } from '../../services/firestore.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-rama',
  templateUrl: './rama.component.html',
  styleUrls: ['./rama.component.css']
})
export class RamaComponent implements OnInit {

  nextPath: string = 'modalidad';
  tryGo: boolean = false; // true means that the user has tried to go next
  allValid: boolean; // true meas that all inputs are valid

  // save firestore data
  ramasData: any[] = [];
  provinciasData: any[] = [];

  // save client data in this object
  formData: any = {
    rama: '',
    provincia: '',
    antiguoAlumno: ''
  }

  constructor(
    private firestore: FirestoreService,
    private storage: StorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getData('ramas');
    this.getData('provincias');

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

    // change the status
    this.tryGo = true;

    // form wil be valid if all inputs are valid, convert the string into boolean value
    this.allValid = JSON.parse($('span.allvalid').text()); 
    
    // permit to continue if all inputs are valid
    if(this.allValid) {
      this.router.navigate(['/signup', path]);
    }

  }

}
