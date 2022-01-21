import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Home Page';
  authd = false;
  constructor(private _userService: UserService) {
    this.authd = this._userService.isLoggedIn();
  }
}
