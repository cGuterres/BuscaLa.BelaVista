import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/AuthService.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
      public router: Router
    , private toastr: ToastrService
    , public authService: AuthService) { }

  ngOnInit() {
  }
  loggedIn() {
    // se nao está logado esconde o menu
    return this.authService.loggedIn();
  }

  login() {
    this.router.navigate(['/user/login']);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
