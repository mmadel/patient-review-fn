import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { ClinicService } from 'src/app/modules/admin/services/clinic/clinic.service';
@Component({
  selector: 'app-admin-header-component',
  templateUrl: './admin-header-component.component.html',
  styleUrls: ['./admin-header-component.component.css']
})
export class AdminHeaderComponentComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar1";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });
  startDate: number | undefined;
  endDate: number | undefined;
  public customRanges = {
    Today: [new Date(), new Date()],
    Yesterday: [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 1))
    ],
    'Last 7 Days': [
      new Date(new Date().setDate(new Date().getDate() - 6)),
      new Date(new Date())
    ],
    'Last 30 Days': [
      new Date(new Date().setDate(new Date().getDate() - 29)),
      new Date(new Date())
    ],
    'This Month': [
      new Date(new Date().setDate(1)),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    ],
    'Last Month': [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0)
    ],
    'Clear': [
      0,
      0
    ]
  };
  constructor(private classToggler: ClassToggleService ,private clinicService:ClinicService) {
    super();
  }

  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }
  setSelectedClinic(event: any) {
    this.clinicService.selectedClinic$.next(event.target.value)
  }
  startDateChange(event: any) {
    console.log('startDateChange');
    this.startDate = event ? moment(new Date(event)).startOf('day').valueOf() : 0;
  }
  endDateChange(event: any) {
    console.log('endDateChange');
    this.endDate = event ? moment(new Date(event)).endOf('day').valueOf() : 0;
  }
}
