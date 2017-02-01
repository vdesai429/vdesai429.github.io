import { Component, OnInit, NgZone } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

declare const Kinvey:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loggingin = false;
    loginalert: boolean;
    activeUser: any;
    loginalerttext: string;

    constructor(private router: Router, public zone: NgZone) {}

    ngOnInit() {
     

      // reroute if logged in:  if (this.activeUser) {this.router.navigate(['']) }
    }

    goLogin(form) {
        this.loggingin = true;
        var username = form.username;
        var password = form.password;

         Kinvey.initialize({
                    apiHostname: 'https://tju-us1-baas.kinvey.com',
                    appKey: 'kid_Hkj21bQBx',
                    appSecret: 'af0b08f6921d43958883517e896f370b'
                }).then(() => {
        Kinvey.User.logout().then(() => {
            
            Kinvey.User.login(username, password).then((user) => {
                if (user) {
                    this.router.navigate(['']);
                    this.loggingin = false;
                }
            }).catch((err) => {
                console.log(err.code)

                if (err.code == 401) {
                this.zone.run(() => {
                    setTimeout(() => {
                        this.loginalerttext = "Incorrect username or password. Please try again"
                        this.loginalert = true;                        
                        this.loggingin = false;
                    }, 1000);

                });
                }

                else {
                      this.zone.run(() => {
                    setTimeout(() => {
                        this.loginalerttext = "Request Failed. Please check your internet connection"
                        this.loginalert = true;                        
                        this.loggingin = false;
                    }, 1000);

                });
                }

            })
        })
                })


    }

}
