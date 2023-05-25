import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FeedbackRoutingModule } from './feedback-routing.module';
import {
  faStar as fasStar
  , faPhoneVolume as faPhoneVolume
  , faCreditCard as faCreditCard
  , faTimeline as faTimeline
  , faChildReaching as faChildReaching
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithubAlt as faGithubAlt,
  faProductHunt as faProductHunt,
  faAdn as faAdn
} from '@fortawesome/free-brands-svg-icons';
import {
  AlertModule, ButtonModule,
  CardModule, FormModule, GridModule,
  SharedModule,
  UtilitiesModule,
  ButtonGroupModule,
  ProgressModule
} from '@coreui/angular-pro';

import { PatientFeedbackComponent }
  from './index'
const APP_COMPONENTS = [
  PatientFeedbackComponent
]
@NgModule({
  declarations: [
    APP_COMPONENTS
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    SharedModule,
    UtilitiesModule,
    ButtonGroupModule,
    IconModule,
    ReactiveFormsModule,
    ProgressModule,
    FontAwesomeModule,
    FormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class FeedbackModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasStar, faGithubAlt, faPhoneVolume, faCreditCard, faProductHunt, faTimeline, faChildReaching, faAdn);
  }
}
