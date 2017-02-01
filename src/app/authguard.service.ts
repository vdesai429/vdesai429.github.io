import { Injectable,EventEmitter,Output,Input,NgZone } from '@angular/core';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

declare const Kinvey:any;


@Injectable()
export class AuthGuard implements CanActivate {
isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);



  constructor(private router: Router, public zone:NgZone) {
  }



  canActivate(  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean {
    // If user is not logged in we'll send them to the homepage 

var result=true;
 Kinvey.initialize({
  apiHostname: 'https://tju-us1-baas.kinvey.com',
  appKey: 'kid_Hkj21bQBx',
  appSecret: 'af0b08f6921d43958883517e896f370b'
}).then(() => {
    var activeUser = Kinvey.User.getActiveUser();
    if (!activeUser) {
      this.router.navigate(['/login']);
     result = false; 
     return false;
    
    }

    else {
      result=true;
      if (activeUser.data.isAdmin) {
        this.isAdmin.next(true);
      }

      else {

      }
   
    }
   return
});   

 return result;
}


}
