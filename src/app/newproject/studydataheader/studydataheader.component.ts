import { Component, OnInit, Input,Output } from '@angular/core';

@Component({
  selector: 'studydataheader',
  templateUrl: './studydataheader.component.html',
  styleUrls: ['./studydataheader.component.css']
})
export class StudydataheaderComponent implements OnInit {

@Input() accession: string;
@Input() studydate: string;

  constructor() { }

  ngOnInit() {
  }

}

