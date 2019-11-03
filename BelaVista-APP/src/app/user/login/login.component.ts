import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/AuthService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(
      public router: Router
    , private toastr: ToastrService
    , private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      console.log(`token ${localStorage.getItem('token')}`);
      this.router.navigate(['/condominium']);
    }
  }

  login() {
    console.log(this.model);
    this.authService.login(this.model)
    .subscribe(
      () => {
        this.router.navigate(['/condominium']);
      }, error => {
        this.toastr.error('Login inválido.');
      }
    )
  }
}
