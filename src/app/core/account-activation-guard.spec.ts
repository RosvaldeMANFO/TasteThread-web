import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accountActivationGuard } from './account-activation-guard';

describe('accountActivationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => accountActivationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
