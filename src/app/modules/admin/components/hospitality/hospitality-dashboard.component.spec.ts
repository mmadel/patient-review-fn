import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalityDashboardComponent } from './hospitality-dashboard.component';

describe('HospitalityDashboardComponent', () => {
  let component: HospitalityDashboardComponent;
  let fixture: ComponentFixture<HospitalityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalityDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
