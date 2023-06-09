import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PateintReviewRoutingModule } from './pateint-review-routing.module';
import { IconModule } from '@coreui/icons-angular';
import {
  AlertModule, ButtonModule,
  CardModule, FormModule, GridModule,
  SharedModule,
  UtilitiesModule,
  ButtonGroupModule,
  ProgressModule
} from '@coreui/angular-pro';

import {
  PatientReviewComponent,
  FeedbackComponent,
  FeedbackItemsComponent,
  SubmitReviewComponent
} from './index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
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
import { NgxSpinnerModule } from 'ngx-spinner';

const APP_REVIEw_COMPONENTS = [
  PatientReviewComponent,
  FeedbackComponent,
  FeedbackItemsComponent,
  SubmitReviewComponent
]
@NgModule({
  declarations: [
    APP_REVIEw_COMPONENTS,
    FeedbackItemsComponent,
  ],
  imports: [
    CommonModule,
    AlertModule,
    PateintReviewRoutingModule,
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
    FormsModule ,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

  ]
})
export class PateintReviewModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasStar, faGithubAlt, faPhoneVolume, faCreditCard, faProductHunt, faTimeline, faChildReaching, faAdn);
  }
}
