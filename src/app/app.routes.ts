import { Routes } from '@angular/router';
import { AccountActivation } from './feature/account-activation/account-activation';
import { accountActivationGuard } from './core/guards/account-activation-guard';
import { Login } from './feature/login/login';
import { LandingPage } from './feature/landing-page/landing-page';
import { ResetPassword } from './feature/reset-password/reset-password';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './feature/home/home';
import { Privacy } from './feature/privacy/privacy';

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
        path: 'home',
        component: Home,
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
    },
    {
        path: 'privacy-policy',
        component: Privacy
    },
    {
        path: '**',
        redirectTo: 'landing'
    }
];