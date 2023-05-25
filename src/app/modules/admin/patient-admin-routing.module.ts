import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardFeedbackComponent } from './components/dashboard/dashboard-feedback.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardFeedbackComponent,
  data: {
    title: 'Dashboard'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientAdminRoutingModule { }
