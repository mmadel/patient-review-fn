import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponentComponent } from './core';
import { DefaultLayoutComponent } from './core/reviewlayout/default-layout.component';
import { LoginComponent } from './modules/security';
import { AuthenticationGuardGuard } from './modules/security/service/authentication-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
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
  {
    path: 'admin',
    component: AdminLayoutComponentComponent,
    canActivateChild: [AuthenticationGuardGuard],
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
  // {
  //   path: 'review',
  //   component: DefaultLayoutComponent,
  //   data: {
  //     title: 'Review'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./modules/review/pateint-review.module').then((m) => m.PateintReviewModule)
  //     },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
