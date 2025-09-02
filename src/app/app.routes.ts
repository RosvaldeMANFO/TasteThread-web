import { Routes } from '@angular/router';
import { AccountActivation } from './feature/account-activation/account-activation';
import { accountActivationGuard } from './core/account-activation-guard';
import { Authentication } from './feature/authentication/authentication';
import { Dashboard } from './feature/dashboard/dashboard';
import { LandingPage } from './feature/landing-page/landing-page';
import { App } from './app';

export const routes: Routes = [
    {
        path: '',
        component: App
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
    }
];