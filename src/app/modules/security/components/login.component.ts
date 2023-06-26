import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = {
    userName: null,
    password: null
  };
  errorMessage: string | null;
  @ViewChild('loginForm') loginForm: NgForm;
  constructor(private authService: AuthenticationService,
    private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService.login(this.form).subscribe(response => {
        if (response.userRole === 'ADMIN')
          this.router.navigateByUrl('/admin');
        if (response.userRole === 'USER')
          console.log('response.userRole === USER ')
        this.spinner.hide();

      }, err => {
        this.spinner.hide();
        if (err.status === HttpStatusCode.Unauthorized)
          this.errorMessage = 'invalid username or password'

      });
    } else {
      this.errorMessage = 'Please enter valid data';
    }
  }
  resetError(): void {
    this.errorMessage = null;
  }

}
