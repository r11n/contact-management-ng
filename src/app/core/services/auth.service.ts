import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService) { }

  isLoggedIn(): boolean {
    return this.storage.check('auth_token');
  }
}
