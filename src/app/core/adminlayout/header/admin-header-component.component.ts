import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { ClinicService } from 'src/app/modules/admin/services/clinic/clinic.service';
import { AuthenticationService } from 'src/app/modules/security/service/authentication.service';
import { Router } from '@angular/router';
import { Clinic } from 'src/app/modules/admin/models/clinic.model';
@Component({
  selector: 'app-admin-header-component',
  templateUrl: './admin-header-component.component.html',
  styleUrls: ['./admin-header-component.component.css']
})
export class AdminHeaderComponentComponent extends HeaderComponent {
  clinics: Clinic[] = new Array();
  selectedOption: Clinic = {
    id: null,
    name: null,
    address: '',
    selected: false
  };
  @Input() sidebarId: string = "sidebar1";
  isUserRole: boolean = false

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });
  startDate: number;
  endDate: number;
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
  constructor(private classToggler: ClassToggleService, private clinicService: ClinicService
    , private authService: AuthenticationService, private router: Router) {
    super();
  }
  ngOnInit(): void {
    if (localStorage.getItem('userRole') === 'USER')
      this.isUserRole = true;
    var selectedClinic: Clinic = JSON.parse(localStorage.getItem('selected-clinic') || '{}')
    this.clinicService.getByUserId(Number(localStorage.getItem('userId') || {})).subscribe(response => {
      response.body?.forEach(element => {
        this.clinics.push(element);
      });

      this.clinics.sort().sort((a, b) => {
        if (a.name !== null && b.name !== null)
          return (a.name > b.name) ? 1 : -1;
        return 1;
      });
      this.clinicService.selectedClinic$.next(this.clinics[0]);
      this.clinicService.userClinics$.next(this.clinics);
    })
  }
  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }
  setSelectedClinic(event: any) {
    for (let i = 0; i < this.clinics.length; i++) {
      if (this.clinics[i].id == Number(event.target.value)) {
        this.clinicService.selectedClinic$.next(this.clinics[i])
      }
    }
  }
  startDateChange(event: any) {
    var offset: number = new Date().getTimezoneOffset() / 60;
    if (offset > 0)
      offset = offset * -1;
    this.startDate = event ? moment(new Date(event)).utcOffset(offset, true).startOf('day').valueOf() : 0;
  }
  endDateChange(event: any) {
    var offset: number = new Date().getTimezoneOffset() / 60;
    if (offset > 0)
      offset = offset * -1;
    this.endDate = event ? moment(new Date(event)).utcOffset(offset, true).endOf('day').valueOf() : 0;
    this.emitFilterDate(this.startDate, this.endDate)
  }
  emitFilterDate(startDate: number, endDate: number) {
    var validDate = this.validateDateCriteria(startDate, endDate)
    if (validDate) {

      var dates: number[] = [startDate, endDate]
      this.clinicService.filterDate$.next(dates)
    }
  }
  validateDateCriteria(startDate: number, endDate: number): boolean {
    if (startDate > endDate) {
      return false;
    }

    if (isNaN(startDate)) {
      return false;
    }
    if (isNaN(endDate)) {
      return false;
    }
    return true;
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
