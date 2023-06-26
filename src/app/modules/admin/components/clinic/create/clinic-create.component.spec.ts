import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicCreateComponent } from './clinic-create.component';

describe('ClinicCreateComponent', () => {
  let component: ClinicCreateComponent;
  let fixture: ComponentFixture<ClinicCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
