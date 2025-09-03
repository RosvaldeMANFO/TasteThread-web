import { Routes } from '@angular/router';
import { AccountActivation } from './feature/account-activation/account-activation';
import { accountActivationGuard } from './core/account-activation-guard';
import { Authentication } from './feature/authentication/authentication';
import { Dashboard } from './feature/dashboard/dashboard';
import { LandingPage } from './feature/landing-page/landing-page';
import { ResetPassword } from './feature/reset-password/reset-password';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: Authentication
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'landing',
        component: LandingPage
    },
    {
        path: 'activate',
        component: AccountActivation,
        canActivate: [accountActivationGuard]
    },
    {
        path: 'reset-password',
        component: ResetPassword
    }
];