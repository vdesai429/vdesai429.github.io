import { Component, OnInit, ViewChild, AfterViewInit, Input, EventEmitter, AfterViewChecked, OnDestroy, NgZone} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {toast, MaterializeAction} from 'angular2-materialize';

interface JQuery {
    pickadate():void;
}

declare const Kinvey: any;


@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})
export class NewprojectComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor(private route: ActivatedRoute, private zone: NgZone, private router: Router) {}


    @ViewChild('tab2') tab2;
    @ViewChild('tab3') tab3;

    accession: string;
    studydate: string;
    neworedit = 'new';
    totaltrials: number;
    trials = {};


    toggleenable(number) {
        if (number == '2') {
            setTimeout(() => {
                this.tab2.nativeElement.click();
            }, 100);
        }

        if (number == '3') {
            setTimeout(() => {
                this.tab3.nativeElement.click();
            }, 100);
        }

    }

    modalActions2 = new EventEmitter < string | MaterializeAction > ();
    params = []

    openModal2() {
        this.modalActions2.emit({
            action: "modal",
            params: ['open']
        });
    }

    ngAfterViewInit() {

        this.datefilled = 'active';



        ( < any > $('#studydate')).pickadate({
                format: 'yyyy-mm-dd'
            })
            .on('change', function() {
                $(this).next().find('.picker__close').click();
            });

    }


    dataready: boolean = false;
    date: string;
    datefilled: string;

    id: any;
    private sub: any;
    activeUserID: any;

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    ngOnInit() {


        this.sub = this.route.params.subscribe(params => {

            if (params['id']) {

                this.id = +params['id']; // (+) converts string 'id' to a number
                console.log(this.id);
                this.accession = this.id.toString();
                console.log(this.accession)

                Kinvey.initialize({
                    apiHostname: 'https://tju-us1-baas.kinvey.com',
                    appKey: 'kid_Hkj21bQBx',
                    appSecret: 'af0b08f6921d43958883517e896f370b'
                }).then(() => {
                    var activeUser = Kinvey.User.getActiveUser();
                    this.activeUserID = activeUser.data._id

                    var dataStore = Kinvey.DataStore.collection('data');

                    var query = new Kinvey.Query();
                    query.equalTo('_id', this.accession);
                    var stream = dataStore.find(query);
                    stream.subscribe((entities) => {
                        this.zone.run(() => {

                            console.log(entities);

                            if (entities.length > 0) {
                                this.studydate = entities[0].studydate;
                                this.neworedit = 'edit';

                                if (entities[0].trials) {
                                    this.trials = entities[0].trials;
                                    this.totaltrials = Object.keys(entities[0].trials).length;
                                } else {
                                    this.trials = {};
                                    this.totaltrials = 1;
                                }
                                this.dataready = true;

                            } else {
                                this.router.navigate(['/newproj']);
                            }


                        });



                    });
                });



            } else {
                console.log('id not found in params');
                toast("Let's Begin!", 4000, 'blue');
                setTimeout(() => {
                    this.modalActions2.emit({
                        action: "modal",
                        params: ['open']
                    });
                }, 0);

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var stringdd;
                var stringmm;

                var yyyy = today.getFullYear();
                if (dd < 10) {
                    stringdd = '0' + dd;
                }
                if (dd >= 10) {
                    stringdd = dd;
                }
                if (mm >= 10) {
                    stringmm = mm;
                }
                if (mm < 10) {
                    stringmm = '0' + mm;
                }
                this.date = stringmm + '/' + stringdd + '/' + yyyy;
            }

        });
    }

    AccNotSet = "disabled";

    isAccNotSet(accnum) {
        if (accnum.length > 5) {
            this.AccNotSet = "";
        }

    }

    submitForm(form) {
        console.log(form);
        this.accession = form.accession;
        this.studydate = form.studydate;


            var dataStore = Kinvey.DataStore.collection('data');
            var activeUser = Kinvey.User.getActiveUser();
            var activeUserID = activeUser.data._id;
            var returnedEntity = [];


            var query = new Kinvey.Query();
            query.equalTo('_id', this.accession);
            var stream = dataStore.find(query);
            var self = this;

            stream.subscribe((entities) => {
                returnedEntity = entities;
            }, (error) => {
                console.log("Error"+error)
            },
               () => {
                   console.log(returnedEntity);
                
                if (returnedEntity)
                {
                    if (returnedEntity[0]._acl.creator == activeUserID || activeUser.data.isAdmin == true) {  //editting existing if creator or admin
                        this.router.navigate(['/newproj', this.accession]);
                        toast("Note: Editting Existing Project!", 4000, 'red');

                    } 
                    
                    else { //request access?
                        alert("This project exists under a different user");
                        this.router.navigate([''])
                    }
                      
                }
                        
                else { //start new project
                     dataStore.save({
                        _id: this.accession,
                        _acl: {
                              creator: activeUserID,
                              groups: 
                                 { w: ['admin'],
                                   r: ['admin','user']
                                 }
                        },
                    accession: this.accession,
                        studydate: this.studydate,
                    }).then((entity)=>{
                        this.router.navigate(['/newproj', this.accession]);
                        toast("New Project!", 4000, 'green');
                    })
                }

                })      

          
        
    }

}