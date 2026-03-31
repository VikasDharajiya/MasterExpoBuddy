import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExhibition } from './add-exhibition';

describe('AddExhibition', () => {
  let component: AddExhibition;
  let fixture: ComponentFixture<AddExhibition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExhibition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExhibition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
