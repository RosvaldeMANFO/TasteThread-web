import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

export const accountActivationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, _) => {
  const token = route.queryParamMap.get('token');
  if (token) {
    return true;
  }
  return false;
};
