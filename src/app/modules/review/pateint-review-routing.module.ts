import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientReviewComponent } from './components/patient.review/patient-review.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'review',
    pathMatch: 'full',
  },
  {
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
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PateintReviewRoutingModule { }
