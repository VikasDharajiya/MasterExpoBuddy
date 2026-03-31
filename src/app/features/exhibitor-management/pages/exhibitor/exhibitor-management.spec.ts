import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExhibitorManagement } from './exhibitor-management';

describe('Exhibitor', () => {
  let component: ExhibitorManagement;
  let fixture: ComponentFixture<ExhibitorManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitorManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(ExhibitorManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
