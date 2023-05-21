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
} from '@coreui/angular-pro';

import {
  PatientReviewComponent,
  PatientSubmitionComponent
} from './index'

const APP_REVIEw_COMPONENTS = [
  PatientReviewComponent,
  PatientSubmitionComponent
]
@NgModule({
  declarations: [
    APP_REVIEw_COMPONENTS
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
    IconModule
  ]
})
export class PateintReviewModule { }
