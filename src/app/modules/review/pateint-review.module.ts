import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PateintReviewRoutingModule } from './pateint-review-routing.module';


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
    PateintReviewRoutingModule
  ]
})
export class PateintReviewModule { }
