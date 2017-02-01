import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

//emit events for each component - trial, analysis, pt data, studydata
//have header, sections for each, table view for trials?
//sign by user


  constructor() { }

  ngOnInit() {
  }

}
