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
  @Input() sidebarId: string = "sidebar1";

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
    //TODO : get username from local-storage
    //this.userName = this.localService.getData('userName');
    //TODO : 
    //this.userName = this.userName.charAt(0).toUpperCase()
    //TODO : get clinics of loggedin user and emit to selectedClinic$ first clinic in list 
    /*this.clinicService.getByUserId(Number(this.localService.getData('userId') || {})).subscribe(response => {
      response.body?.forEach(element => {
        this.clinics.push(element);
      });
      this.clinicService.selectedClinic$.next(this.clinics[0].id)
    })*/
    var selectedClinicId = localStorage.getItem('selected-clinic')
    this.clinicService.getByUserId(Number(localStorage.getItem('userId') || {})).subscribe(response => {
      response.body?.forEach(element => {
        if (element.id == selectedClinicId)
          element.selected = true;
        this.clinics.push(element);
      });
      console.log(JSON.stringify(this.clinics))
      this.clinicService.selectedClinic$.next(Number(selectedClinicId) === 0?this.clinics[0].id:Number(selectedClinicId) )
    })
  }
  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }
  setSelectedClinic(event: any) {
    localStorage.setItem('selected-clinic', event.target.value)
    this.clinicService.selectedClinic$.next(event.target.value)
  }
  startDateChange(event: any) {
    this.startDate = event ? moment(new Date(event)).startOf('day').valueOf() : 0;
  }
  endDateChange(event: any) {
    this.endDate = event ? moment(new Date(event)).endOf('day').valueOf() : 0;
    this.emitFilterDate(this.startDate, this.endDate)
  }
  emitFilterDate(startDate: number, endDate: number) {
    console.log('emitFilterDate');
    var validDate = this.validateDateCriteria(startDate, endDate)
    console.log('validDate ' + validDate);
    if (validDate) {
      var dates: number[] = [startDate, endDate]
      this.clinicService.filterDate$.next(dates)
    }
  }
  validateDateCriteria(startDate: number, endDate: number): boolean {
    if (startDate > endDate) {
      console.log('this.dashBoardDateCriteria.startDate ' + startDate);
      console.log('this.dashBoardDateCriteria.endDate ' + endDate);
      console.log('this.dashBoardDateCriteria.startDate > this.dashBoardDateCriteria.endDate');
      return false;
    }

    if (isNaN(startDate)) {
      console.log('isNaN(this.dashBoardDateCriteria.startDate)');
      return false;
    }
    if (isNaN(endDate)) {
      console.log('isNaN(this.dashBoardDateCriteria.endDate)');
      return false;
    }
    return true;
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
