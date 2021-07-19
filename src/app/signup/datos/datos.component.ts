import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  nextPath: string = 'direccion';
  previousPath: string = 'tarifa';

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

  goTo(path) {
    // save data to storage before leaving the page 
    this.storage.addStorage(this.formData);

    this.router.navigate(['/signup', path]);
  }

}
