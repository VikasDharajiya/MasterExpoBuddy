import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDialoge } from './base-dialoge';

describe('BaseDialoge', () => {
  let component: BaseDialoge;
  let fixture: ComponentFixture<BaseDialoge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDialoge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDialoge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
