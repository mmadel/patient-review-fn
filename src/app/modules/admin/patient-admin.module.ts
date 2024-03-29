import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { PatientAdminRoutingModule } from './patient-admin-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  GridModule,
  SharedModule,
  SmartTableModule,
  TableModule,
  FormModule,
  DatePickerModule,
  DropdownModule,
  ButtonGroupModule,
  ListGroupModule,
  TabsModule,
  NavModule,
  DateRangePickerModule,
  TimePickerModule,
  SmartPaginationModule,
  ToastModule,
  CalloutModule,
  MultiSelectModule,
  WidgetModule,
  ProgressModule,
  ModalModule,
  HeaderModule
} from '@coreui/angular-pro';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  DashboardFeedbackComponent,
  CardsComponent,
  ChartHospitalityComponent,
  ChartClinicalComponent,
  FeedbackCreateComponent,
  ClinicListComponent,
  ClinicCreateComponent,
  UserListComponent,
  UserCreateComponent,
  UserUpdateComponent,
  ExcelReportComponent,
  ClinicUpdateComponent,
  ServiceCountersComponent
} from './components';


const APP_ADMIN_COMPONENT = [
  DashboardFeedbackComponent,
  CardsComponent,
  ChartHospitalityComponent,
  ChartClinicalComponent,
  FeedbackCreateComponent,
  ClinicListComponent,
  ClinicCreateComponent,
  UserListComponent,
  UserCreateComponent,
  UserUpdateComponent,
  ExcelReportComponent,
  ClinicUpdateComponent,
  ServiceCountersComponent
]
@NgModule({
  declarations: [
    APP_ADMIN_COMPONENT,
  ],
  imports: [
    CommonModule,
    PatientAdminRoutingModule,
    AlertModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    SharedModule,
    SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    FormModule,
    DatePickerModule,
    DropdownModule,
    ButtonGroupModule,
    ListGroupModule,

    TabsModule,
    NavModule,
    DateRangePickerModule,
    TimePickerModule,
    IconModule,
    SmartPaginationModule,
    ToastModule,
    CalloutModule,
    MultiSelectModule,
    WidgetModule,
    ProgressModule,
    ChartjsModule,
    QRCodeModule,
    ModalModule,
    HeaderModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  exports:[
    FeedbackCreateComponent
  ]
})
export class PatientAdminModule { }
