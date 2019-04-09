import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  apiuri = environment.apiUri;
  constructor(private http: HttpClient) {}

  login(user: any) {
    const credentials = JSON.stringify(User);
    const uri = this.apiuri + 'auth/validate';
    console.log(User);
    return this.http.get(`${uri}`, {
      params: {
        username: user.username,
        password: user.password
      },
      headers: new HttpHeaders({})
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt');
  }
}
