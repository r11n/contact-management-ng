import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User = new User();
  responseText: string;
  formBuilder = new FormBuilder();
  signupForm = this.formBuilder.group({
    // tslint:disable-next-line:quotemark
    name: [this.user.name, Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")],
    email: ['', [
      Validators.required,
      Validators.pattern(
      '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
      )
    ]],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
    plain_identity: ['', Validators.required]
  }, {
    validator: this.MatchPassword
  });

  constructor(private api: ApiService, private storage: StorageService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    if ( this.auth.isLoggedIn() ) {
      this.router.navigateByUrl('/');
    }
  }

  formSubmit() {
    this.api.post('/auth/signup', {user: this.signupForm.value} ).subscribe(
      (res) => {
        this.storage.set('auth_token', res.auth_token);
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.responseText = this.getErrors(err.error);
      }
    );
  }

  getErrors(err: any) {
    let err_msg = '';
    let count = 0;
    for (const key in err) {
      if (err.hasOwnProperty(key)) {
        count++;
        const element = err[key];
        const attr = key === 'personal_identity_number' ? 'plain_identity' : key ;
        this.signupForm.controls[attr].setErrors({invalid: true});
        err_msg = err_msg + (count > 1 ? '<br>' : '') + key.replace(new RegExp('_', 'g'), ' ') + ' ' + element.join(' and ');
      }
    }
    return err_msg;
  }

  MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const cpassword = AC.get('password_confirmation').value;
    if (password !== cpassword) {
      AC.get('password_confirmation').setErrors({MatchPassword: true});
    } else {
      return null;
    }
  }
}
