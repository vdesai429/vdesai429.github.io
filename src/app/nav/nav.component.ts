import { Component, OnInit, AfterViewInit, Input, NgZone, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {AuthGuard} from "../authguard.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs";


declare const Kinvey:any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

isAdmin:boolean

  constructor(private admincheck: AuthGuard, public router:Router) {
 this.admincheck.isAdmin.subscribe((value) => { 
      console.log(value)
      this.isAdmin = value
    });   
  }

  

ngOnInit() {}

logout() {
  this.admincheck.isAdmin.next(false);
  var promise = Kinvey.User.logout();
  promise = promise.then(() => {
  this.router.navigate(['/login']);
  })
}

}
