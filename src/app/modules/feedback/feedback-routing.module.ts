import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientFeedbackComponent } from './components';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Patient Feedback',
    },
    children: [
      {
        path: 'submit',
        component: PatientFeedbackComponent,
        data: {
          title: 'Submit Patient Feedback',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
