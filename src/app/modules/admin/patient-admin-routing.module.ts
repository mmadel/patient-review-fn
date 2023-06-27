import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClinicCreateComponent, ClinicListComponent, ClinicUpdateComponent, ExcelReportComponent, FeedbackCreateComponent, UserCreateComponent, UserListComponent, UserUpdateComponent } from './components';

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
      path: 'clinic/update/:clinicId',
      component: ClinicUpdateComponent,
      data: {
        title: 'clinic-update',
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
      path: 'user/update/:userId',
      component: UserUpdateComponent,
      data: {
        title: 'user-update',
      }
    }, {
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
