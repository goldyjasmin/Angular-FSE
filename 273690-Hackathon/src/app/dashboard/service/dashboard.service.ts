import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class DashboardService {
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

  getEventDetailsByEventid(token: any, eventId: any) {
    const uri = this.apiuri + 'events/details';
    return this.http.get(`${uri}/${eventId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });
  }
}
