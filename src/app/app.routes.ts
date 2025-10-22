import { Routes } from '@angular/router';
import { AccountActivation } from './feature/account-activation/account-activation';
import { accountActivationGuard } from './core/guards/account-activation-guard';
import { Login } from './feature/login/login';
import { Dashboard } from './feature/dashboard/dashboard';
import { LandingPage } from './feature/landing-page/landing-page';
import { ResetPassword } from './feature/reset-password/reset-password';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard]
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