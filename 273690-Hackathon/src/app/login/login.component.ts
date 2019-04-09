import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthenticationService } from './service/authentication.service';
import { User } from './model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: User;
  @ViewChild('f') myForm;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected localStorage: LocalStorage,
    private authenticationService: AuthenticationService
  ) { }
  private loginDetails: User[];
  private userName: string;
  private password: string;
  private roleId: number;
  invalidLogin = false;
  returnUrl: string;


  onSubmit() {
    this.userName = this.model.username;
    this.password = this.model.password;
    localStorage.setItem('username', this.model.username);

    this.authenticationService.login(this.model).subscribe(
      response => {
        const result = <any>response;
        const token = (<any>response).token;
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        const e = decodedToken.admin;
        const e1 = decodedToken.Admin;

        localStorage.setItem('jwt', token);
        localStorage.setItem('role', result.role);
        this.router.navigate(['dashboard']);
      },
      err => {
        this.invalidLogin = true;
      }
    );
  }

  ngOnInit() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('eventidRpt');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    console.log('hit');
    this.model = new User();

  }
}
