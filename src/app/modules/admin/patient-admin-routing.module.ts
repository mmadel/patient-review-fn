import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicCreateComponent, ClinicListComponent, FeedbackCreateComponent } from './components';
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
},{
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
    },{
      path: 'clinic/list',
      component: ClinicListComponent,
      data: {
        title: 'clinic-list',
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
