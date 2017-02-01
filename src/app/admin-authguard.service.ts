import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

declare const Kinvey:any;

@Injectable()
export class AdminAuthguardService implements CanActivate {

  constructor(private router: Router) {}

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
        console.log(activeUser)
 
    if (!activeUser) {
      this.router.navigate(['']);
     result = false;  
     console.log(result)
     console.log("false")
     return false;
    
    }

    if (activeUser) {

        if (activeUser.data.isAdmin) {
        console.log(activeUser.data.isAdmin)
        console.log("admin")
        result=true
        return true;
       }

      else {
      result = false;
      this.router.navigate(['']);
      return false
      }
   
}
});   

console.log(result)
 return result;
}

}
