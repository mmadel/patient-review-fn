import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientReviewComponent } from './components/patient.review/patient-review.component';
import { PatientSubmitionComponent } from './components/patient.submition/patient-submition.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'PatientReview',
  },
  children: [
    {
      path: 'review',
      component: PatientReviewComponent,
      data: {
        title: 'Patient Review',
      },
    },
    {
      path: 'submit',
      component: PatientSubmitionComponent,
      data: {
        title: 'Submition',
      },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PateintReviewRoutingModule { }
