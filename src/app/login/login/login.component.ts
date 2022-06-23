import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  

  constructor(private _fB: FormBuilder,
    private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this._fB.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      this.loginForm.get('username')?.value,
      this._authenticationService.authenticate(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value )
    }
  }
}
