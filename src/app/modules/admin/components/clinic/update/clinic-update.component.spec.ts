import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicUpdateComponent } from './clinic-update.component';

describe('ClinicUpdateComponent', () => {
  let component: ClinicUpdateComponent;
  let fixture: ComponentFixture<ClinicUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
