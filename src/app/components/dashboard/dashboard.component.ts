import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userInfo = {
    name: '',
    email: '',
    username: '',
    id: ''
  };
  constructor(private _userService: UserService) {
    this.userInfo = this._userService.fetchDetails();
  }

  ngOnInit() {
    console.log('Dashboard ', this.userInfo)
  }

}
