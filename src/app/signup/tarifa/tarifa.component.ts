import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import { FirestoreService } from '../../services/firestore.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
  styleUrls: ['./tarifa.component.css']
})
export class TarifaComponent implements OnInit {

  nextPath: string = 'datos';
  previousPath: string = 'modalidad';
  tryGo: boolean = false; // true means that the user has tried to go next
  allValid: boolean; // true meas that all inputs are valid

  // save firestore data
  tarifasData: any[] = [];

  // save client data in this object
  formData: any = {
    tarifa: ''
  }

  constructor(
    private firestore: FirestoreService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData('tarifas');
    
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

  goTo(path, e) {
    // save data to storage before leaving the page 
    this.storage.addStorage(this.formData);

    // determine next or previous
    if(e.target.value == 'Siguiente') {
      // change the status
      this.tryGo = true;

      // form wil be valid if all inputs are valid, convert the string into boolean value
      this.allValid = JSON.parse($('span.allvalid').text()); 

      // permit to continue if all inputs are valid
      if(this.allValid) {
        this.router.navigate(['/signup', path]);
      }

    } else {
      this.router.navigate(['/signup', path]);

    }

  }

}
