import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAsideComponentComponent } from './admin-aside-component.component';

describe('AdminAsideComponentComponent', () => {
  let component: AdminAsideComponentComponent;
  let fixture: ComponentFixture<AdminAsideComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAsideComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAsideComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
