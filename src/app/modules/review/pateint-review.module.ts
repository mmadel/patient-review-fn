import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PateintReviewRoutingModule } from './pateint-review-routing.module';
import { PatientReviewComponent } from './components/patient.review/patient-review.component';
import { PatientSubmitionComponent } from './components/patient.submition/patient-submition.component';


@NgModule({
  declarations: [
    PatientReviewComponent,
    PatientSubmitionComponent
  ],
  imports: [
    CommonModule,
    PateintReviewRoutingModule
  ]
})
export class PateintReviewModule { }
