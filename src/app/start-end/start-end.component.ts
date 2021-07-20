import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start-end',
  templateUrl: './start-end.component.html',
  styleUrls: ['./start-end.component.css']
})
export class StartEndComponent implements OnInit {

  nextPath: string = 'signup/rama';
  signup: string = ''; // change the page display depending on the value, work with *ngIf

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams();    
  }

  // get router param and save it in this.signup
  getParams() {
    this.route.params.subscribe((data) => {
      this.signup = data.status;
    });
  }


  goTo(path, e) {
    // determine where to go
    if(e.target.value == 'Comenzar') {
        this.router.navigate(['/signup/rama']); //start signup process
    } else {
      this.router.navigate(['/startend', 'start']); //go to start page
    }

  }

}
