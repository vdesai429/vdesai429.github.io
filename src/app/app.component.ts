import {Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import {toast} from "angular2-materialize";
import {Router,ActivatedRoute} from "@angular/router";

declare const Kinvey: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 

  constructor(private router:Router) {}

  ngOnInit() {

  
  }






};
