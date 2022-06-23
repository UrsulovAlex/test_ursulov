import { Component } from '@angular/core';
import { IMenu } from './interfaces/menu';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  menu: IMenu[] = [
    {
      name: 'Dashboard',
      router: 'dashboard',
    }
  ] 

  constructor(public _authenticationService: AuthenticationService) {
  }

}
