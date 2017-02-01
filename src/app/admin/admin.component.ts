import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

    buttons = [{
            'title': 'Admin Dashboard',
            'value': 'admindash',
            'name': 'adminbutton',
            'selected': false
        },
        {
              'title': 'Manage Users',
            'value': 'adminusers',
            'name': 'adminbutton',
            'selected': false
        },
        {
           'title': 'Study Options',
            'value': 'adminoptions',
            'name': 'adminbutton',
            'selected': true
        }

    ];





}
