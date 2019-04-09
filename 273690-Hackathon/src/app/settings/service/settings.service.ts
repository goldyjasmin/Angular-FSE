import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SettingsService {
  constructor(private http: HttpClient) {}

  apiuri = environment.apiUri;

  getEventNames(token: any, userId: any) {
    const uri = this.apiuri + 'events/eventnames';
    return this.http.get(`${uri}/${userId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });
  }
  getUsers(token: any) {
    const uri = this.apiuri + 'settings/users';
    return this.http.get(uri, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });
  }
  getPendingFeedbacklist(token: any, eventId: any) {
    const uri = this.apiuri + 'settings/pendingusers';
    return this.http.get(`${uri}/${eventId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });
  }
  sendMail(pendingList: any) {
    const feedbackDetails = JSON.stringify(pendingList);
    const uri = this.apiuri + 'settings/sendmail';
    return this.http.put(`${uri}`, feedbackDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getEventDetailsByEventid(token: any, eventId: any) {
    const uri = this.apiuri + 'settings/details';
    return this.http.get(`${uri}/${eventId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });
  }

  updateUser(userInfo: any) {
    const user = JSON.stringify(userInfo);
    const uri = this.apiuri + 'settings/updateuser';
    return this.http.put(`${uri}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
