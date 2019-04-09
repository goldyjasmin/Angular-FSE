import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class FeedbackService {
  constructor(private http: HttpClient) {}
  apiuri = environment.apiUri;

  save(feedback: any) {
    const feedbackDetails = JSON.stringify(feedback);
    const uri = this.apiuri + 'feedback/save';
    return this.http.post(`${uri}`, feedbackDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getFeedbackDetailsByEventid(
    token: any,
    eventId: any,
    empId: any,
    userType: any
  ) {
    const uri = this.apiuri + 'feedback/details';
    return this.http.get(`${uri}/${eventId}/${empId}/${userType}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });
  }
}
