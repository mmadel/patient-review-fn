import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartClinicalComponent } from './chart-clinical.component';

describe('ChartClinicalComponent', () => {
  let component: ChartClinicalComponent;
  let fixture: ComponentFixture<ChartClinicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartClinicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartClinicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
