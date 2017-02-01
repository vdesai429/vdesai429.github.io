import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

    params = [
      {
        onOpen: (el) => {
          console.log("Collapsible open", el);
        },
        onClose: (el) => {
          console.log("Collapsible close", el);
        }
      }
    ];

    values = [
      {"tab": "Oral", "tabdata": [
          {"title": "Lip Closure", "options": ["No labial escape", "Interlabial escape", "Escape to lateral juncture", "Escape to mid-chin"]},
          {"title": "Tongue Control", "options": ["Cohesive bolus", "Escape to floor of mouth", "Posterior escape < half bolus", "Posterior escape > half bolus"]},
          {"title": "Bolus Prep", "options": ["Timely chewing", "Slow chewing with complete recoil", "Disorganized chewing", "Minimal chewing"]}
          ], "tabactive": "active"},
      {"tab": "Laryngeal", "tabdata": [
          {"title": "Laryngeal stuff", "options": ["No labial escape", "Interlabial escape"]},
          {"title": "Epiglottis", "options": ["Cohesive bolus", "Escape to floor of mouth"]}
          ], "tabactive": ""}, 
      {"tab":"Pharyngeal", "tabdata": [
          {"title": "Lip Closure", "options": ["No labial escape", "Interlabial escape"]},
          {"title": "Tongue Control", "options": ["Cohesive bolus", "Escape to floor of mouth"]}
          ], "tabactive": ""}, 
      {"tab":"Esophageal", "tabdata": [
          {"title": "Lip Closure", "options": ["No labial escape", "Interlabial escape"]},
          {"title": "Tongue Control", "options": ["Cohesive bolus", "Escape to floor of mouth"]}
          ], "tabactive": ""}];


  constructor() { }

  ngOnInit() {
  }

  

}
