import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialoge } from './confirm-dialoge';

describe('ConfirmDialoge', () => {
  let component: ConfirmDialoge;
  let fixture: ComponentFixture<ConfirmDialoge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialoge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialoge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
