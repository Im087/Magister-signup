import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Ramas } from '../../models/ramas';
import { Provincias } from '../../models/provincias';

@Component({
  selector: 'app-rama',
  templateUrl: './rama.component.html',
  styleUrls: ['./rama.component.css']
})
export class RamaComponent implements OnInit {

  ramasRef: AngularFirestoreCollection<Ramas> = null;
  provinciasRef: AngularFirestoreCollection<Provincias> = null;
  ramasDB: any[] = [];
  provinciasDB: any[] = [];

  constructor(private db: AngularFirestore) {
    this.ramasRef = db.collection('ramas');
    this.provinciasRef = db.collection('provincias');
  }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.ramasRef.get().subscribe((data) => {
      data.docs.forEach(doc => {
        console.log(doc.data());
        this.ramasDB.push(doc.data());
      });
    });

    this.provinciasRef.get().subscribe((data) => {
      data.docs.forEach(doc => {
        console.log(doc.data());
        this.provinciasDB.push(doc.data());
      });
    });
  }

}
