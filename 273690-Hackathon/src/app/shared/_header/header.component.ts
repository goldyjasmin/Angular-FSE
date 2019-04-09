import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }
  isAdmin: any;
  ngOnInit() {
    const role = localStorage.getItem('role');
    if (role == 'Admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('eventidRpt');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

  }
}
