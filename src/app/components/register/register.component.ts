import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { environment } from './../../../environments/environment';

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
  errorsStr: string = '';
  private _apiURL: string = environment.userApiUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _userService: UserService
  ) {}

  onSubmit() {
    console.log(this.userform.value);
    this.saveData().subscribe(res => {
      this._userService.rememberUser(res)
      alert('Registered successfully');
    }, error => {
      const { errors } = error.error;
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
    console.log(this._userService.fetchUserSession())
  }
}
