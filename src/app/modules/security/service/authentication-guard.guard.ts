import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardGuard implements CanActivateChild {
  constructor(private authService: AuthenticationService,
    private router: Router) { }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getCurrentUser().pipe(
      map(user => !!user),
      tap(isLogged => {
        if (!isLogged) {
          this.router.navigateByUrl('/login');
        }
        if (localStorage.getItem('userRole') === 'USER' && state.url.includes('admin'))
          this.router.navigateByUrl('/normal');
        if (localStorage.getItem('userRole') === 'ADMIN' && state.url.includes('normal'))
          this.router.navigateByUrl('/admin');
      })
    );
  }

}
