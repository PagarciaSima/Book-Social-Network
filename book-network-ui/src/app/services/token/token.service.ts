import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  isTokenValid() {
    const token: string = this.token;
    if (!token) {
      return false;
    }
    // Decode token
    const jwtHelper = new JwtHelperService();
    // Check expiring date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }
}
