import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCountersComponent } from './service-counters.component';

describe('ServiceCountersComponent', () => {
  let component: ServiceCountersComponent;
  let fixture: ComponentFixture<ServiceCountersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCountersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
