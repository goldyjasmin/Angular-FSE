import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  eventid = localStorage.getItem('eventidRpt');

  reportServer = 'http://localhost/reportserver';
  reportUrl = 'hackFse/FSEEvents';
  showParameters = 'false'; // true, false, collapsed
  parameters: any = {
    EventId: localStorage.getItem('eventidRpt') // this.eventid
  };
  language = 'en-us';
  width = 100;
  height = 100;
  toolbar = 'true';
  error: any;
}
