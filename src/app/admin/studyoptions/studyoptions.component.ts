import { Component, OnInit, AfterViewInit, NgZone, EventEmitter } from '@angular/core';
import {toast, MaterializeAction} from 'angular2-materialize';

declare const Kinvey:any;

@Component({
  selector: 'studyoptions',
  templateUrl: './studyoptions.component.html',
  styleUrls: ['./studyoptions.component.css']
})
export class StudyoptionsComponent implements OnInit {

activeUserID:any;
data = [];
activeoption="delete"
modaltext: string;
editoptionval: string;
editfilled: string;
activetable: number;
optionForDelete:string;

  modalActions = new EventEmitter < string | MaterializeAction > ();
    params = []


  constructor(public zone:NgZone) { }

  ngOnInit() {
     Kinvey.initialize({
            apiHostname: 'https://tju-us1-baas.kinvey.com',
            appKey: 'kid_Hkj21bQBx',
            appSecret: 'af0b08f6921d43958883517e896f370b'
        }).then(() => {
            var activeUser = Kinvey.User.getActiveUser();
            this.activeUserID = activeUser.data._id
            console.log(activeUser)

            var dataStore = Kinvey.DataStore.collection('studyoptions');
            var query = new Kinvey.Query();
            query.ascending("sort")
            var stream = dataStore.find(query);
            stream.subscribe((entities) => {
                this.zone.run(() => {
                    console.log(entities);
                    this.data = entities;
                    console.log(this.data);
                });
            });
        });
  }

  ngAfterViewInit() {
  }

closeModal() {
  this.modalActions.emit({
            action: "modal",
            params: ['open']
        });
}

addoption(tablenum) {
  this.activeoption = 'add';
  this.modaltext = 'Add option:'
  this.activetable = tablenum;
  console.log(tablenum);
  console.log(this.data);
    console.log(this.activeoption)
   this.modalActions.emit({
            action: "modal",
            params: ['open']
        });
    }

  editoption(tablenum, option) {
     this.activeoption = 'edit';
     this.editfilled = 'active';
       this.activetable = tablenum;
  this.modaltext = 'Edit option:'
  this.editoptionval = option;
  console.log(tablenum);
  console.log(option);
  console.log(this.activeoption)
  console.log(this.data)
   this.modalActions.emit({
            action: "modal",
            params: ['open']
        });
  }

  deleteoption(tablenum,option) {
    console.log(tablenum);
    console.log(option);
    this.activeoption = 'delete';
    this.activetable = tablenum;
    this.optionForDelete = option;
this.modalActions.emit({
            action: "modal",
            params: ['open']
        });

  }

  submitForm(addoredit, i, form) {
    console.log(addoredit);
    console.log(i)
    console.log(form)

if (addoredit == "add") {
  this.data[i]['options'].push({'value':form.option});
  var dataStore = Kinvey.DataStore.collection('studyoptions');
  var tableid = this.data[i]._id;
  var tablecomponent = this.data[i].component;
  var tableoptions = this.data[i].options;
  var tablesort = this.data[i].sort;

var newentity = {
  _id: tableid,
  sort: tablesort,
  component: tablecomponent,
  options: tableoptions
};

//var acl = new Kinvey.Acl(newentity);
//acl.addWriter('johndoe');
 
      var promise = dataStore.save(newentity)
      .then(function onSuccess(entity) {
  console.log(entity)
  toast(form.option+ " Added to "+tablecomponent, 4000, "green")
}).catch(function onError(error) {
  // ...
});

}

if (addoredit == "edit") {

}


     this.modalActions.emit({
            action: "modal",
            params: ['close']
        });
  }

  deleteSubmit(i, option) {

   var table = this.data[i]['options'];

  table = table.filter(function( obj ) {
  return obj.value !== option;
});

this.data[i]['options'] = table;
console.log(this.data)

  var dataStore = Kinvey.DataStore.collection('studyoptions');
 

  var tableid = this.data[i]._id;
  var tablecomponent = this.data[i].component;
  var tableoptions = this.data[i].options;
  var tablesort = this.data[i].sort;

  var newentity = {
  _id: tableid,
  sort: tablesort,
  component: tablecomponent,
  options: tableoptions
};
  var self=this;
      var promise = dataStore.save(newentity)
      .then(function onSuccess(entity) {
 self.data[i]= entity
    self.modalActions.emit({
            action: "modal",
            params: ['close']
        });
  toast(option+ " deleted from "+tablecomponent, 4000, "red")
}).catch(function onError(error) {
  // ...
});
  }

swapArrayposition(direction,tablenum,option) {
console.log(direction, tablenum,option)

var selectedTablearray = this.data[tablenum]['options'];
var arrayposition:number

   for (var i=0; i < selectedTablearray.length; i++) {
        if (selectedTablearray[i].value === option) {
           arrayposition = i;
           break;


        }
    }

   if (direction=="down"){

  var tmp = selectedTablearray[arrayposition]
  selectedTablearray[arrayposition] = selectedTablearray[arrayposition+1]
  selectedTablearray[arrayposition+1] = tmp

}

if (direction=="up"){

  var tmp = selectedTablearray[arrayposition]
  selectedTablearray[arrayposition] = selectedTablearray[arrayposition-1]
  selectedTablearray[arrayposition-1] = tmp

}

 var dataStore = Kinvey.DataStore.collection('studyoptions');
 

  var tableid = this.data[tablenum]._id;
  var tablecomponent = this.data[tablenum].component;
  var tableoptions = this.data[tablenum].options;
  var tablesort = this.data[tablenum].sort;

  var newentity = {
  _id: tableid,
  sort: tablesort,
  component: tablecomponent,
  options: tableoptions
};
 var self = this;
      var promise = dataStore.save(newentity)
      .then(function onSuccess(entity) {
       self.data[tablenum] = entity
}).catch(function onError(error) {
  console.log(error);
});

}



}


