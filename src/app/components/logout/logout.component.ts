import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private _userService: UserService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this._userService.logout();
    this.document.location.href = '/login';
  }

}
