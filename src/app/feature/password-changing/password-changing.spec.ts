import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChanging } from './password-changing';

describe('PasswordChanging', () => {
  let component: PasswordChanging;
  let fixture: ComponentFixture<PasswordChanging>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordChanging]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordChanging);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
