import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Ramas } from '../models/ramas';
import { Provincias } from '../models/provincias';
import { Modalidades } from '../models/modalidades';
import { Horarios } from '../models/horarios';
import { Tarifas } from '../models/tarifas';
import { Comunidades } from '../models/comunidades';
import { Matriculas } from '../models/matriculas';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  ramasRef: AngularFirestoreCollection<Ramas> = null;
  provinciasRef: AngularFirestoreCollection<Provincias> = null;
  modalidadesRef: AngularFirestoreCollection<Modalidades> = null;
  horariosRef: AngularFirestoreCollection<Horarios> = null;
  tarifasRef: AngularFirestoreCollection<Tarifas> = null;
  comunidadesRef: AngularFirestoreCollection<Comunidades> = null;
  matriculasRef: AngularFirestoreCollection<Matriculas> = null;

  constructor(private db: AngularFirestore) {
    this.ramasRef = db.collection('ramas');
    this.provinciasRef = db.collection('provincias');
    this.modalidadesRef = db.collection('modalidades');
    this.horariosRef = db.collection('horarios');
    this.tarifasRef = db.collection('tarifas');
    this.comunidadesRef = db.collection('comunidades');
    this.matriculasRef = db.collection('matriculas');
  }

  // return different observable depending on the data path
  readFirestore(path): Observable<any>  {
    switch(path) {
      case 'ramas':
        return this.ramasRef.get();
        break;
      case 'provincias':
        return this.provinciasRef.get();
        break;
      case 'modalidades':
        return this.modalidadesRef.get();
        break;
      case 'horarios':
        return this.horariosRef.get();
        break;
      case 'tarifas':
        return this.tarifasRef.get();
        break;
      case 'comunidades':
        return this.comunidadesRef.get();
        break;
      case 'matriculas':
        return this.matriculasRef.get();
        break;
    }
  }

  createFirestore(data: any): any {
    return this.matriculasRef.add(data);
  }

}
