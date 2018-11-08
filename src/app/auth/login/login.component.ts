import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/models/user';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  responseText: string;
  formBuilder = new FormBuilder();
  loginForm = this.formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.pattern(
      '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
      )
    ]],
    password: ['', Validators.required]
  });

  constructor(private api: ApiService, private storage: StorageService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    if ( this.auth.isLoggedIn() ) {
      this.router.navigateByUrl('/');
    }
  }

  formSubmit() {
    this.api.post('/auth/login', {user: this.loginForm.value} ).subscribe(
      (res) => {
        this.storage.set('auth_token', res.auth_token);
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.responseText = err.error.message;
      }
    );
  }

}
