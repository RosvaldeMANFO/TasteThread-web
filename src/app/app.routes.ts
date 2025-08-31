import { Routes } from '@angular/router';
import { AccountActivation } from './feature/account-activation/account-activation';
import { accountActivationGuard } from './core/account-activation-guard';

export const routes: Routes = [
    {
        path: 'activate',
        component: AccountActivation,
        canActivate: [accountActivationGuard]
    }
];