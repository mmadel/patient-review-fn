import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  CardModule,
  GridModule,
  SharedModule,
  FormModule,


} from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './components/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    GridModule,
    SharedModule,
    FormModule,
    IconModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class SecurityModule { }
