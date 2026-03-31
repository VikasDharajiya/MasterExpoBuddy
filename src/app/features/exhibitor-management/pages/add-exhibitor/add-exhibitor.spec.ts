import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExhibitor } from './add-exhibitor';

describe('AddExhibitor', () => {
  let component: AddExhibitor;
  let fixture: ComponentFixture<AddExhibitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExhibitor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExhibitor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
