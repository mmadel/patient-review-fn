import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHospitalityComponent } from './chart-hospitality.component';

describe('ChartHospitalityComponent', () => {
  let component: ChartHospitalityComponent;
  let fixture: ComponentFixture<ChartHospitalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartHospitalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartHospitalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
