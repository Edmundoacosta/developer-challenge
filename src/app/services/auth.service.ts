import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  isLoggedInGuard(): boolean {
    const expirationTime = Number(localStorage.getItem('token'));
    if (new Date().getTime() > Number(expirationTime)) {
      localStorage.removeItem('token');
      return false;
    } else {
      return true;
    }
  }
}