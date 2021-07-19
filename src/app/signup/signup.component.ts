import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import * as $ from 'jquery';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private storage: StorageService) { }

  ngOnInit(): void {
    this.listenRouter();
  }

  listenRouter(): void {
    let top: number; // top distance of the active-circle

    // listen to router changes
    this.router.events.subscribe((event) => {
      //when the navigation is finished
      if(event instanceof NavigationEnd) {
        // get the new path
        let path = this.router.url.split('/')[2];
        // change top distance according to the path
        switch(path) {
          case 'rama':
            top = 245;
            break;
          case 'modalidad':
            top = 311;
            break;
          case 'tarifa':
            top = 377;
            break;
          case 'datos':
            top = 443;
            break;
          case 'direccion':
            top = 509;
            break;
          case 'pago':
            top = 575;
            break;
        }
        
        // move the active circle
        $('#active-circle').animate({top: `${top}px`}, 500);
        // style the left part background image
        $('#left-part').css('background-image', `url(../../assets/img/${path}.png)`);

      }
    });
  }

  // executed when a component in <router-outlet> is deactivated
  getFormData(e) {
    // save data to storage before leaving the page 
    this.storage.addStorage(e.formData);
  }

}
