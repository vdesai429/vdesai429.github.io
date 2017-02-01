import { Component, OnInit, Input,NgZone } from '@angular/core';
import {toast} from 'angular2-materialize'

declare const Kinvey: any;


@Component({
  selector: 'trials',
  templateUrl: './trials.component.html',
  styleUrls: ['./trials.component.css']
})
export class TrialsComponent {

    @Input() accession;
    @Input() studydate;
    @Input() neworedit;
    @Input() totaltrials;
    @Input() trials;

    currenttrial = 1;
    trial = 1;
    consistency = '';
    result = '';

    currentmod = '';


    prevarrow_showhide: boolean = false;
    nextarrow_showhide: boolean = false;


    addbutton: boolean = true;

    //disable result until consistency selected

    //!!!load data from kinvey if editting. totaltrials = array.length. oninit show arrows and load trial 1 data if exists


    buttons = [];

    resultoptions = [];

    modoptions = [];


    mods = {};


    trialprev() {
        console.log(this.currenttrial, this.consistency, this.result, this.mods)

        var myTrial = new this.trialtoarray(this.currenttrial, this.consistency, this.result, this.mods);
        this.trials[myTrial.trial] = myTrial;
        this.savetrial();
        console.log(this.trials);

        this.currenttrial = this.currenttrial - 1;
        this.addbutton = false;

        if (this.trials[this.currenttrial]) {
            this.consistency = this.trials[this.currenttrial].consistency;
            this.result = this.trials[this.currenttrial].result;
            this.mods = this.trials[this.currenttrial].mods;
        } else {
            this.consistency = '';
            this.result = '';
            this.mods = {};
        }


        if (this.currenttrial == 1) {
            this.prevarrow_showhide = false;
        }

        if (this.currenttrial < this.totaltrials) {
            this.nextarrow_showhide = true;
        }

    }

    nexttrial() {
        console.log(this.currenttrial, this.consistency, this.result, this.mods)
        var myTrial = new this.trialtoarray(this.currenttrial, this.consistency, this.result, this.mods);
        this.trials[myTrial.trial] = myTrial;
        this.savetrial();

        console.log(this.trials);


        this.currenttrial++;

        if (this.trials[this.currenttrial]) {
            this.consistency = this.trials[this.currenttrial].consistency;
            this.result = this.trials[this.currenttrial].result;
            this.mods = this.trials[this.currenttrial].mods;
        } else {
            this.consistency = '';
            this.result = '';
            this.mods = {};
        }

        this.prevarrow_showhide = true;

        if (this.currenttrial < this.totaltrials) {
            this.nextarrow_showhide = true;
        }

        if (this.currenttrial >= this.totaltrials) {
            this.nextarrow_showhide = false;
            this.addbutton = true;
        }

    }



    selectbtn(i) {
        this.consistency = this.buttons[i]['value'];
        console.log(this.consistency);
    }


    selectresult(i) {
        this.result = this.resultoptions[i]['value'];
        console.log(this.result);

    }



    selectmod(i, event) {
        this.currentmod = this.modoptions[i]['value'];
        console.log(this.currentmod)
        console.log(event)

        if (event.target.checked == true) {
            this.mods[this.currentmod] = true;

        } else {
            delete this.mods[this.currentmod];

        }
        console.log(this.mods)


    }


    trialtoarray(trial, consistency, result, mods) {
        this.consistency = consistency;
        this.result = result;
        this.mods = mods;
        this.trial = trial;


    }

    savetrial() {
        Object.keys(this.trials).forEach((key) => (this.trials[key]['consistency'] == '') && delete this.trials[key]);
        console.log(this.trials)

        var dataStore = Kinvey.DataStore.collection('data');
        var activeUser = Kinvey.User.getActiveUser();
        var activeUserID = activeUser.data._id;
        console.log(activeUserID)
        var entitytosave = {
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
            trials: this.trials
        }
       
        console.log(entitytosave)

        dataStore.save(entitytosave).then(function onSuccess(entity) {
            console.log(entity)


        }).catch(function onError(error) {
            console.log("Error. Data not saved")
        });

    }

    donebutton() {
        var myTrial = new this.trialtoarray(this.currenttrial, this.consistency, this.result, this.mods);
        this.trials[myTrial.trial] = myTrial;
        this.savetrial();
        console.log(this.trials);



        toast("Trials Complete!", 4000, 'green');
    }

    addtrial() {
        var myTrial = new this.trialtoarray(this.currenttrial, this.consistency, this.result, this.mods);
        this.trials[myTrial.trial] = myTrial;
        this.savetrial();
        console.log(this.trials);

        this.consistency = '';
        this.result = '';
        this.mods = {};

        this.currenttrial++


            toast("Trial #" + this.currenttrial, 4000, 'blue');



        if (this.currenttrial < this.totaltrials) {
            this.addbutton = false;
        } else {
            this.totaltrials++
                this.addbutton = true;
        }

        this.prevarrow_showhide = true;
    }

    ngAfterViewInit() {


    }

    constructor(public zone:NgZone) {}

    ngOnInit() {

        console.log(this.neworedit)
        if (this.neworedit == "edit") {

            console.log(this.neworedit)


            if (this.totaltrials > 1) {
                this.nextarrow_showhide = true;
                this.addbutton = false;
            }

            if (this.trials[this.currenttrial]) {
                this.consistency = this.trials[this.currenttrial].consistency;
                this.result = this.trials[this.currenttrial].result;
                this.mods = this.trials[this.currenttrial].mods;
            }
        }

                 var dataStore = Kinvey.DataStore.collection('studyoptions');
                 var query = new Kinvey.Query();
                 query.ascending("sort")
        var stream = dataStore.find(query);
stream.subscribe((entities) => {
        this.zone.run(() => {
                    console.log("getting study options")
            if (entities.length > 0) {
     console.log(entities);
     this.buttons = entities[0]['options'];
     this.resultoptions = entities[1]['options']
     this.modoptions = entities[2]['options']
    
            }
        })
});
          
     
    


    }

}