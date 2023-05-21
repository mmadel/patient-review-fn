import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSubmitionComponent } from './patient-submition.component';

describe('PatientSubmitionComponent', () => {
  let component: PatientSubmitionComponent;
  let fixture: ComponentFixture<PatientSubmitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSubmitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSubmitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
