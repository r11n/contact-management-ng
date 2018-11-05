import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService, private api: ApiService) { }

  isLoggedIn(): boolean {
    return this.storage.check('auth_token');
  }

  isAdmin(): Observable<any> {
    return this.api.get('/is_admin');
  }
}
