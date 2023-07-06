import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, catchError, EMPTY, finalize, Observable, throwError } from 'rxjs';
import { UserRoleURLS } from 'src/app/core/adminlayout/user.role.urls';
import { AuthenticationService } from './authentication.service';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
    private router: Router, private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('token') || '{}';
    this.spinner.show();
    return next.handle(this.addAuthorizationHeader(req, accessToken)).pipe(
      finalize(() => {
        this.spinner.hide();
      }),
      catchError(err => {
        // in case of 401 http error
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.logoutAndRedirect(err);
        }

        // in case of 403 http error (refresh token failed)
        if (err instanceof HttpErrorResponse && err.status === 403) {
          // logout and redirect to login page
          return this.logoutAndRedirect(err);
        }
        // if error has status neither 401 nor 403 then just return this error
        return throwError(err);
      })
    );

  }
  
  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    var requestMapping: string = _.split(request.url, '/', 4)[3];
    var securedURLS: string[] = new Array();
    var notSecuredURLS: string[] = new Array();

    UserRoleURLS.forEach(element => {
      if (localStorage.getItem('userRole') !== undefined &&
        element.name === localStorage.getItem('userRole'))
        securedURLS = element.urls
      if (element.name === 'PERMITTED')
        notSecuredURLS = element.urls;
    });
    if (_.some(notSecuredURLS, (el) => _.includes(requestMapping, el))) {
      return request;
    }
    if (_.some(securedURLS, (el) => _.includes(requestMapping, el))) {
      if (token) {
        return request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }
      return request;
    }    
    return Observable.create(EMPTY);;
  }

  private logoutAndRedirect(err: any): Observable<HttpEvent<any>> {
    this.authService.logout();
    this.router.navigateByUrl('/login');

    return throwError(err);
  }
}
