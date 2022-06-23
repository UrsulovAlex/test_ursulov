import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string | null = '';

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(): void {
    this.userName = localStorage.getItem('User');
  }

  logOut(): void {
    this._authenticationService.logOut();
  }
}
