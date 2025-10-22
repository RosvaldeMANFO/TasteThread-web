import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordState } from './password.state';
import { FormsModule, NgForm } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CustomButtonComponent } from '../../utils/components/custom-button/custom-button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, MatIconModule, CustomButtonComponent,
    MatFormFieldModule
  ],
  templateUrl: './reset-password.html',
})
export class ResetPassword implements OnInit {

  state: PasswordState = {
    newPassword: '',
    confirmPassword: '',
    loading: false,
  };
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ResetPasswordService,
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.router.navigate(['/landing'], { replaceUrl: true });
    } else {
      this.state.token = token;
    }
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    if (this.state.newPassword !== this.state.confirmPassword) {
      this.state.message = 'Passwords do not match.';
      return;
    }
    this.state.loading = true;
    this.service.resetPassword(this.state.token, this.state.newPassword).subscribe({
      next: (result) => {
        this.state = {
          newPassword: '',
          confirmPassword: '',
          loading: false,
          message: result.data ?? '',
          success: true
        };
      },
      error: (result) => {
        console.log(result);
        this.state = {
          ...this.state,
          loading: false,
          message: result.error?.message,
          success: false
        };
      }
    });
  }
}
