import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientReviewComponent } from './components/patient.review/patient-review.component';

const routes: Routes = [
  {
  path: '',
  data: {
    title: 'PatientReview',
  },
  children: [
    {
      path: 'feedback',
      component: PatientReviewComponent,
      data: {
        title: 'Patient Review',
      },
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PateintReviewRoutingModule { }
