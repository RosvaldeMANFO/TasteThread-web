import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AuthenticationState } from './authentication.state';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authentication',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './authentication.html',
})
export class Authentication implements OnInit {
  state: AuthenticationState = {
    user: {
      email: '',
      password: ''
    },
    rememberMe: false,
    loading: false,
  }
  showPassword = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.state.user = JSON.parse(storedUser);
        this.state.rememberMe = true;
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.state.loading = true;
    this.authService.login({
      email: this.state.user.email,
      password: this.state.user.password
    })
      .subscribe({
        next: (response) => {
          this.state.loading = false;
          if (this.state.rememberMe) {
              localStorage.setItem('user', JSON.stringify(this.state.user));
            }
            if (response.data?.nextLink) {
              sessionStorage.setItem('token', JSON.stringify(response.data?.token));
              sessionStorage.setItem('nextLink', response.data.nextLink);
            }
            this.handleRouting(response.data?.nextLink);
        },
        error: (result) => {
          this.state = {
            ...this.state,
            loading: false,
            message: result.error?.message,
            success: false
          };
        }
      });
  }

  handleRouting(nextLink?: string) {
    const route = nextLink ? [nextLink] : ['/landing-page'];
    this.router.navigate(route, { replaceUrl: true });
  }
}


