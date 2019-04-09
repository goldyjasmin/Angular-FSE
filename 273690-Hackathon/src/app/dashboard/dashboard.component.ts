import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/service/dashboard.service';
import { EventDetails } from '../dashboard/model/eventdetails';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private service: DashboardService) { }

  eventDetail: EventDetails;
  eventNames: any;
  eventResponse: any;
  eventSelectedId: any;
  totalUsers: any;
  countParticipated: any;
  countResgisterdNotAttended: any;
  countUnResgisterdNotAttended: any;
  ngOnInit() {
    const token = localStorage.getItem('jwt');
    this.getEventNames(token);
    this.eventDetail = new EventDetails();
  }

  getEventNames(token: any) {
    this.service
      .getEventNames(token, localStorage.getItem('username'))
      .subscribe(
        response => {
          this.eventResponse = response;
          // this.eventDetail = <EventDetails>response;
          this.eventNames = this.eventResponse.eventNames;
          this.eventSelectedId = '0';
          console.log(this.eventDetail);
        },
        err => {
          console.log(err);
        }
      );
  }

  onEventChange(eventId) {
    console.log(eventId);
    localStorage.setItem('eventidRpt', eventId);
    this.service
      .getEventDetailsByEventid(localStorage.getItem('jwt'), eventId)
      .subscribe(
        response => {
          this.eventDetail = <EventDetails>response;

          console.log('666');
          this.totalUsers = this.eventDetail.participatedUsers + this.eventDetail.resgisterdNotAttended + this.eventDetail.registeredUnregistered;
          this.countParticipated = (this.eventDetail.participatedUsers / this.totalUsers) * 100;
          this.countResgisterdNotAttended = (this.eventDetail.resgisterdNotAttended / this.totalUsers) * 100;
          this.countUnResgisterdNotAttended = (this.eventDetail.registeredUnregistered / this.totalUsers) * 100;
          console.log(this.countParticipated);
          // console.log(this.eventDetail);
        },
        err => {
          console.log(err);
        }
      );

  }
}
