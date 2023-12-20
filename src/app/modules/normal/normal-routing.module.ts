import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackCreateComponent } from '../admin/components';

const routes: Routes = [
  {
    path: 'feedback/create',
    component: FeedbackCreateComponent,
    data: {
      title: 'patient'
    },
  }, {
    path: '',
    redirectTo: 'feedback/create',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NormalRoutingModule { }
