import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExhibitionManagement } from './exhibition-management';

describe('ExhibitionManagementComponent', () => {
  let component: ExhibitionManagement;
  let fixture: ComponentFixture<ExhibitionManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitionManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(ExhibitionManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter staff by search', () => {
    component.onSearch('floyd');
    expect(component.filteredList.length).toBe(1);
    expect(component.filteredList[0].name).toBe('Floyd Miles');
  });

  it('should show all staff when search is empty', () => {
    component.onSearch('');
    expect(component.filteredList.length).toBe(component.filteredList.length);
  });
});
