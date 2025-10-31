import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountActivationService } from './account-activation.service';
import { ActivationState } from './account-activation.state';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon'


@Component({
  selector: 'app-account-activation',
  imports: [CommonModule, MatIconModule],
  templateUrl: './account-activation.html',
})
export class AccountActivation implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private activationService: AccountActivationService
  ) {}

  state: ActivationState = new ActivationState();

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.activationService.activateAccount(token).subscribe({
        next: () => {
          this.state = {
            ...this.state,
            success: true,
            message: 'Account activated successfully!'
          };
        },
        error: (err) => {
          this.state = {
            ...this.state,
            success: false,
            message: err.error?.message
          };
        }
      });
    }
  }
}