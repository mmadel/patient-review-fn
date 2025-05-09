import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting: boolean = true;
  hidePassword = true;
  errorMessage: string | undefined;
  constructor(private authService: AuthenticationService,
    private router: Router, private spinner: NgxSpinnerService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const credentials = this.loginForm.value;
    this.spinner.show();
    this.authService.login(credentials).subscribe(response => {
      if (response.userRole === 'ADMIN')
        this.router.navigateByUrl('/admin');
      if (response.userRole === 'USER')
        this.router.navigateByUrl('/normal');

      this.spinner.hide();
      this.errorMessage = undefined
    }, err => {
      this.spinner.hide();
      if (err.status === HttpStatusCode.Unauthorized)
        this.errorMessage = 'invalid username or password'
    });
  }
  get email() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }
  bothFieldsTouched(): boolean | undefined {
    return this.email?.dirty && this.email?.valid &&
      this.password?.dirty && this.password?.valid;
  }
}
