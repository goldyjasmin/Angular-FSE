import { Component, OnInit } from '@angular/core';
import { SettingsService } from './service/settings.service';
import { Pendingfeedback } from './model/pendingfeedback';
import { EventDetails } from '../dashboard/model/eventdetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './model/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private service: SettingsService, private fb: FormBuilder) {}

  form: FormGroup;
  pendingList: any;
  eventDetail: EventDetails;
  eventNames: any;
  eventResponse: any;
  eventSelectedId: any;
  pendingListIndex: any = [];
  userDetails: any = [];
  user: any;
  roles: any;
  roleId: any;
  userInfo: User;
  ngOnInit() {
    const token = localStorage.getItem('jwt');
    this.getEventNames(token);
    this.createForm();
    this.getUsers();
    this.userInfo = new User();
  }
  get f() {
    return this.form.controls;
  }
  getEventNames(token: any) {
    this.service
      .getEventNames(token, localStorage.getItem('username'))
      .subscribe(
        response => {
          this.eventResponse = response;
          this.eventNames = this.eventResponse.eventNames;
          this.eventSelectedId = '0';
          console.log(this.eventResponse);
          console.log(this.eventDetail);
          console.log(this.eventNames);
        },
        err => {
          console.log(err);
        }
      );
  }
  sendMail() {
    console.log(this.pendingListIndex);
    this.service
      .sendMail(this.pendingListIndex)
      .subscribe(response => {}, err => {});
  }
  getIndex(eventPriId, empId, usertype) {
    console.log(eventPriId);
    this.pendingListIndex.push({
      EventPrimaryId: eventPriId,
      EmployeeId: empId,
      UserTypeId: usertype
    });
  }
  createForm() {
    this.form = this.fb.group({
      gnPendingFeedbackList: this.fb.group({
        configureAllMail: [''],
        configureMail: []
      })
    });
  }
  onRoleChange(id) {
    this.roleId = id;
    console.log(id);
  }
  saveUser(id, active, roleId) {
    console.log(id);
    console.log(active);
    console.log(roleId);
    this.userInfo.IsActive = active;
    this.userInfo.SelectedRoleId = roleId;
    this.userInfo.UserId = id;
    this.service.updateUser(this.userInfo).subscribe(response => {}, err => {});
  }
  onEventChange(eventId) {
    console.log(eventId);
    this.service
      .getPendingFeedbacklist(localStorage.getItem('jwt'), eventId)
      .subscribe(
        response => {
          this.pendingList = response;
          console.log(this.pendingList);
        },
        err => {
          console.log(err);
        }
      );

    this.service
      .getEventDetailsByEventid(localStorage.getItem('jwt'), eventId)
      .subscribe(
        response => {
          this.eventDetail = <EventDetails>response;
          console.log('111');
          console.log(this.eventDetail);
        },
        err => {
          console.log(err);
        }
      );
  }

  getUsers() {
    this.service.getUsers(localStorage.getItem('jwt')).subscribe(
      response => {
        this.userDetails = response;
        this.user = this.userDetails.user;
        this.roles = this.userDetails.roles;
        console.log(this.userDetails);
        console.log('55');
        console.log(this.user);
        console.log(this.roles);
      },
      err => {
        console.log(err);
      }
    );
  }
}
