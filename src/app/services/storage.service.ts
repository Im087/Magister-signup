import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // store data in browser
  addStorage(obj) {
    for(let i in obj) {
      // only store valid data
      if(obj[i]) {
        window.localStorage.setItem(i, obj[i]);
      }  
    }
  }

  // get data back from browser
  getStorage(obj) {
    for(let i in obj) {    
      // only get valid data
      if(window.localStorage.getItem(i)) {
        obj[i] = window.localStorage.getItem(i);
      }  
    }
  }
}
