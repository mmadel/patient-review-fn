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
  PatientSubmitionComponent,
  GoodReviewComponent,
  ImproveReviewComponent
} from './index';


const APP_REVIEw_COMPONENTS = [
  PatientReviewComponent,
  PatientSubmitionComponent,
  GoodReviewComponent,
  ImproveReviewComponent
]
@NgModule({
  declarations: [
    APP_REVIEw_COMPONENTS,
    GoodReviewComponent,
    ImproveReviewComponent
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
