import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../interface/users.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private users$ = new BehaviorSubject<User[]>([]);
  readonly users: Observable<User[]> = this.users$.asObservable();
  constructor() {}

  private loadUsers(): User[] {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        return JSON.parse(storedUsers);
      } catch (error) {
        localStorage.removeItem('users');
        return [];
      }
    }
    return [];
  }

  loadInitialItems(): void {
    const currentItems = this.users$.getValue();
    if (!currentItems || currentItems.length === 0) {
      const initialItems = this.loadUsers();
      if (initialItems && initialItems.length > 0){
        this.users$.next(initialItems);
      }
    }
  }

  addUser(newUser: Omit<User, 'id'>): void {
    const currentValue = this.users$.getValue();
    const nextId = currentValue.length > 0 ? Math.max(...currentValue.map(item => item.id)) + 1 : 1;
    const updatedItems = [...currentValue, { id: nextId, ...newUser }];
    localStorage.setItem('users', JSON.stringify(updatedItems));
    this.users$.next(updatedItems);
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  validateIfEmailExist(email: string): Observable<boolean> {
    const users = this.users$.getValue();
    return of(users.some(u => u.email === email));
  }

  validateIfExist(user: User): Observable<boolean> {
    const users = this.users$.getValue();
    return of(users.some(u => u.email === user.email && u.password === user.password));
  }
}
