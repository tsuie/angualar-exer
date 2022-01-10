import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/user.service';

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
  private _apiURL: string = 'http://localhost:8000/api/register';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _userService: UserService
  ) {}


  onSubmit() {
    console.log(this.userform.value);

    // this.http.post(this._apiURL, {
    //   name: this.userform.value.fullName,
    //   email: this.userform.value.email,
    //   username: this.userform.value.username,
    //   password: this.userform.value.password,
    //   password_confirmation: this.userform.value.c_pass,
    //   user_type: 'member'
    // }).subscribe(response => {
    //   // Save to Local storage
    //   console.log(response);
    // }, (err:HttpErrorResponse)=>{
    //   // Alert Error
    //   this.formErrors = err.error;
    //   console.log(this.formErrors);
    // });
    this.saveData().subscribe(res => {}, error => {
      const { errors } = error.error;
      console.log(errors);
      this.errors = errors;
      this.errorsStr = JSON.stringify(errors);
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
  }
}
