import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://localhost:5000/api/user/';
  jwtHelper = new JwtHelperService();
  decodeToken: any;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // chamadas para a controller
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  login(model: any) {
    return this.http.post(`${this.baseURL}login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user)
        {
          localStorage.setItem('currentUser', JSON.stringify(user.userLogin));
          this.currentUserSubject.next(user.userLogin);

          localStorage.setItem('token', user.token);
          this.decodeToken = this.jwtHelper.decodeToken(user.token);

          localStorage.setItem('role', user.role);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(`${this.baseURL}register`, model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    // verifica se o token está ativo ainda
    return !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin() {
    const role = localStorage.getItem('role');
    return role.toString().toLocaleLowerCase() === 'administrador';
  }
}
