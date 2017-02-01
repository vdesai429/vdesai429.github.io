import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import {toast, MaterializeAction} from 'angular2-materialize';

declare const Kinvey: any;

@Component({
  selector: 'admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})

export class AdmindashboardComponent implements OnInit {

  toolscol = "33%";

    dashdata: any[];
    temp = [];
    offset = 0;
    accessionForDelete: string;
    width:number;
    height:number;

    //analytics data
    numprojects:number;
    numinprog = 0;
    numusers:number;

    //modal params
    modalActions = new EventEmitter < string | MaterializeAction > ();
    params = []


    constructor(public zone: NgZone, private route: Router) {
          window.onresize = (e) =>
    {
        zone.run(() => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            
            if (this.width < 561) {
              this.toolscol = "100%"
            }

            if (this.width >= 561) {
              this.toolscol = "33%"
            }


        });
    };
    }

    activeUserID: any;

    ngAfterViewInit() {
       this.width = window.innerWidth;
            this.height = window.innerHeight;
            
            if (this.width < 561) {
              this.toolscol = "100%"
            }

            if (this.width >= 561) {
              this.toolscol = "33%"
            }

    }

    getKinveyDashData() {
  Kinvey.initialize({
            apiHostname: 'https://tju-us1-baas.kinvey.com',
            appKey: 'kid_Hkj21bQBx',
            appSecret: 'af0b08f6921d43958883517e896f370b'
        }).then(() => {
            var activeUser = Kinvey.User.getActiveUser();
            this.activeUserID = activeUser.data._id
            console.log(activeUser)

            var dataStore = Kinvey.DataStore.collection('data');
            var query = new Kinvey.Query();
            query.descending('_kmd.lmt');

            var stream = dataStore.find(query);
            stream.subscribe((entities) => {
                this.zone.run(() => {
                    console.log(entities);
                    this.dashdata = entities;
                    this.temp = entities;
                    console.log(this.dashdata);

                    this.numprojects = entities.length;
                    console.log(this.numprojects)
                    this.numinprog = 0
                   for (var i = 0; i < entities.length; i++) { 
                   if (!entities[i]['trials']) {

                     this.numinprog++
                   }
                        }


                });
            });
        });
    }

    ngOnInit() {
      this.getKinveyDashData();

    }

    deleteproj(accession) {
        console.log(accession);
        this.accessionForDelete = accession;
        this.openModal();
    }

    deleteSubmit(accession) {
        var dataStore = Kinvey.DataStore.collection('data');
        var promise = dataStore.removeById(this.accessionForDelete);
        promise = promise.then((result) => {
            this.closeModal();
            toast("#" + this.accessionForDelete + " deleted", 4000, "red");
            this.accessionForDelete = '';
                 this.getKinveyDashData();
        })
    }

    openModal() {
        this.modalActions.emit({
            action: "modal",
            params: ['open']
        });
    }

    closeModal() {
        this.modalActions.emit({
            action: "modal",
            params: ['close']
        });
    }

    editproj(accession) {
        this.route.navigate(['/newproj', accession])
    }

    downloademail(accession) {
        alert("coming soon")
    }

    viewreport(accession) {
        alert("coming soon")
    }

      updateFilter(event) {
    let val = event.target.value;

    // filter our data
    let temp = this.temp.filter(function(d) {
      return d.accession.toLowerCase().indexOf(val) !== -1 || !val;  
    });
    

    // update the rows
    
    this.dashdata = temp;
    
  }



}
