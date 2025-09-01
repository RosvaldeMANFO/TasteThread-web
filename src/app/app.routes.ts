import { Routes } from '@angular/router';
import { AccountActivation } from './feature/account-activation/account-activation';
import { accountActivationGuard } from './core/account-activation-guard';
import { Authentication } from './feature/authentication/authentication';

export const routes: Routes = [
    {
        path: 'auth',
        component: Authentication
    },
    {
        path: 'activate',
        component: AccountActivation,
        canActivate: [accountActivationGuard]
    }
];