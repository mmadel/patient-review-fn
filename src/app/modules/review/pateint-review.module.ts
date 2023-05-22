import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PateintReviewRoutingModule } from './pateint-review-routing.module';
import { IconModule } from '@coreui/icons-angular';
import {
  AlertModule, ButtonModule,
  CardModule, FormModule, GridModule,
  SharedModule,
  UtilitiesModule,
  ButtonGroupModule,
  ProgressModule
} from '@coreui/angular-pro';

import {
  PatientReviewComponent,
  PatientSubmitionComponent,
  GoodReviewComponent,
  ImproveReviewComponent,
  MainReviewComponent
} from './index';
import { ReactiveFormsModule } from '@angular/forms';


const APP_REVIEw_COMPONENTS = [
  PatientReviewComponent,
  PatientSubmitionComponent,
  GoodReviewComponent,
  ImproveReviewComponent,
  MainReviewComponent,
  MainReviewComponent
]
@NgModule({
  declarations: [
    APP_REVIEw_COMPONENTS,
  ],
  imports: [
    CommonModule,
    AlertModule,
    PateintReviewRoutingModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    SharedModule,
    UtilitiesModule,
    ButtonGroupModule,
    IconModule,
    ReactiveFormsModule,
    ProgressModule
  ]
})
export class PateintReviewModule { }
