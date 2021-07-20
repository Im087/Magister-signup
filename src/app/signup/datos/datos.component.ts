import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  nextPath: string = 'direccion';
  previousPath: string = 'tarifa';
  tryGo: boolean = false; // true means that the user has tried to go next
  allValid: boolean; // true meas that all inputs are valid

  // save client data in this object
  formData: any = {
    nombre: '',
    dni: '',
    movil: '',
    email: ''
  }

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // get storage data to recover already filled form when initializing
    this.storage.getStorage(this.formData);
    
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
