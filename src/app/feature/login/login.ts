import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { LoginService } from './login.service';
import { AuthenticationState } from './login.state';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomButtonComponent } from '../../utils/components/custom-button/custom-button';
import { AuthService } from '../../core/services/auth.service';
import { Spinner } from "../../utils/components/spinner/spinner";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CustomButtonComponent,
    Spinner
],
  templateUrl: './login.html',
})
export class Login implements OnInit {
  state: AuthenticationState = {
    credential: {
      email: '',
      password: ''
    },
    rememberMe: false,
    loading: false,
  }
  showPassword = false;

  constructor(
    private router: Router,
    private service: LoginService,
    private auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const credential = this.auth.getCredential();
      if (credential) {
        this.state = { 
          ...this.state,
          rememberMe: true,
          credential: credential
        };
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
    this.service.login({
      email: this.state.credential.email,
      password: this.state.credential.password
    })
      .subscribe({
        next: (response) => {
          this.state.loading = false;
          localStorage.setItem('userEmail', this.state.credential.email);
          if (this.state.rememberMe) {
            this.auth.setCredential(this.state.credential)
          }
          if(response.data?.nextLink){
            this.auth.setToken(response.data.token);
            this.auth.setNextDestination(response.data.nextLink);
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