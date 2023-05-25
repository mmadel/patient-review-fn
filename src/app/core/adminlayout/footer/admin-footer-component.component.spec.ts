import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFooterComponentComponent } from './admin-footer-component.component';

describe('AdminHeaderComponentComponent', () => {
  let component: AdminFooterComponentComponent;
  let fixture: ComponentFixture<AdminFooterComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFooterComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFooterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
