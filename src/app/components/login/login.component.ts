import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';
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
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _userService: UserService,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit(): void {
    console.log(this._userService.isLoggedIn());
    if(this._userService.isLoggedIn()) {
      this.document.location.href = '/dashboard';
    }
  }
  onSubmit() {
    console.log(this.userform.value);
    console.log('Submit');
  }

}
