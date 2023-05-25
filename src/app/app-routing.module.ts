import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponentComponent } from './core';
import { DefaultLayoutComponent } from './core/reviewlayout/default-layout.component';

const routes: Routes = [
  {
    path: 'review',
    component: DefaultLayoutComponent,
    data: {
      title: 'Review'
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/review/pateint-review.module').then((m) => m.PateintReviewModule)
      },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponentComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/admin/patient-admin.module').then((m) => m.PatientAdminModule)
      }
    ]
  },
  {
    path: 'feedback',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/feedback/feedback.module').then((m) => m.FeedbackModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
