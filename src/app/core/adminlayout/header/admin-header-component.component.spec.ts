import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderComponentComponent } from './admin-header-component.component';

describe('AdminHeaderComponentComponent', () => {
  let component: AdminHeaderComponentComponent;
  let fixture: ComponentFixture<AdminHeaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHeaderComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
