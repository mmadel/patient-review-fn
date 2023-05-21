import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodReviewComponent } from './components/good.review/good-review.component';
import { ImproveReviewComponent } from './components/improve.review/improve-review.component';
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
      path: 'good',
      component: GoodReviewComponent,
      data: {
        title: 'Patient Review',
      },
    },
    {
      path: 'improve',
      component: ImproveReviewComponent,
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
