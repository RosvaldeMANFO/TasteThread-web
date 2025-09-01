import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AuthenticationState } from './authentication.state';

@Component({
  selector: 'app-authentication',
  imports: [CommonModule],
  templateUrl: './authentication.html',
})
export class Authentication {

  state: AuthenticationState = {
    user: {
      email: '',
      password: ''
    },
    loading: false,
    next: null,
    error: null
  }
  showPassword = false;

  constructor(private authService: AuthenticationService
  ) {

  }

  emailChange(email: string) {
    Object.assign(this.state.user, { email });
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  passwordChange(password: string) {
    Object.assign(this.state.user, { password });
  }
}
