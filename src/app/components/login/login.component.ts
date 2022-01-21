import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userform = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });
  error = [];

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    console.log(this._userService.isLoggedIn());
    // Redirects authenticated users
    if(this._userService.isLoggedIn()) {
      this.document.location.href = '/dashboard';
    }
  }

  onSubmit() {
    console.log(this.userform.value);
    console.log('Submit');
    this.handleLogin().subscribe(res => {
      this._userService.rememberUser(res);
      this.document.location.href = '/dashboard';
    }, (e) => {
      const error = e?.error?.message;
      console.log(e);
      this.error = error || 'Invalid Login';
    })
  }

  handleLogin() {
    const postData = {
      email: this.userform.value.email,
      password: this.userform.value.password
    };
    return this._userService.loginUser(postData);
  }
}
