import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  data: {
    title: 'PatientReview',
  },
  children: [
    {
      path: 'review',
      component: ,
      data: {
        title: 'Patient Review',
      },
    },
    {
      path: 'submit',
      component: ,
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
