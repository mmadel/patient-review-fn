import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicCreateComponent, ClinicListComponent, ExcelReportComponent, FeedbackCreateComponent, UserCreateComponent, UserListComponent } from './components';
import { DashboardFeedbackComponent } from './components/dashboard/dashboard-feedback.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardFeedbackComponent,
  data: {
    title: 'Dashboard'
  },
}, {
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
}, {
  path: '',
  data: {
    title: 'administration',
  },
  children: [
    {
      path: 'feedback/create',
      component: FeedbackCreateComponent,
      data: {
        title: 'feedback-create',
      },
    },
    {
      path: 'clinic/create',
      component: ClinicCreateComponent,
      data: {
        title: 'clinic-create',
      },
    }, {
      path: 'clinic/list',
      component: ClinicListComponent,
      data: {
        title: 'clinic-list',
      },
    },
    {
      path: 'user/list',
      component: UserListComponent,
      data: {
        title: 'user-list',
      },
    }, {
      path: 'user/create',
      component: UserCreateComponent,
      data: {
        title: 'user-create',
      },
    },
    {
      path: 'report/feedback',
      component: ExcelReportComponent,
      data: {
        title: 'patient-feedback',
      },
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientAdminRoutingModule { }
