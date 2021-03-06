import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userform = this.fb.group({
    fullName: ['', Validators.required],
    email:    ['', [Validators.email, Validators.required]],
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    c_pass  : ['', [Validators.required]]
  }, {
    validator: this.CustomValidator('password', 'c_pass')
  });
  errors = [];

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  onSubmit() {
    console.log(this.userform.value);
    this.saveData().subscribe(res => {
      this._userService.rememberUser(res)
      alert('Registered successfully');
      // this._router.navigate(['dashboard']);
      this.document.location.href = '/dashboard';
    }, e => {
      const errors = e?.error?.errors;
      console.log(e);
      this.errors = errors || { 'error' : ['Server Error'] };
    })
  }

  saveData() {
    const postData = {
      name: this.userform.value.fullName,
      email: this.userform.value.email,
      username: this.userform.value.username,
      password: this.userform.value.password,
      password_confirmation: this.userform.value.c_pass,
      user_type: 'member'
    };
    return this._userService.createUser(postData);
  }

  CustomValidator(control: string, matchingControl: string) {
    return (formGroup: FormGroup) => {
      const ctr = formGroup.controls[control];
      const mCtr = formGroup.controls[matchingControl];

      if(ctr.value !== mCtr.value) {
        mCtr.setErrors({ mustMatch: true });
      }
      return;
    };
  }

  // Called once the component has been initialized
  ngOnInit(): void {
    console.log(this._userService.isLoggedIn())
    if(this._userService.isLoggedIn()) {
      // this._router.navigate(['dashboard'])
      this.document.location.href = '/dashboard';
    }
  }
}
