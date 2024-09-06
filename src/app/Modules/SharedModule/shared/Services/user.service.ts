import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private roleSubject = new BehaviorSubject<number>(0); 
  role$ = this.roleSubject.asObservable();

  constructor() {}

  // Method to update the role
  setRole(role: number): void {
    this.roleSubject.next(role);
    localStorage.setItem('role', role.toString());
  }

  getRole(): number {
    return Number(localStorage.getItem('role') || 0);
  }

  clearRole(): void {
    this.roleSubject.next(0);
    localStorage.removeItem('role');
  }
}
