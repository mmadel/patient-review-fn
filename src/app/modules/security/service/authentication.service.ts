import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../model/login.response';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl = environment.baseURL + 'authentication'
  private userUrl = environment.baseURL + 'user'
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }
  login(form: { userName: string | null; password: string | null }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, form)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.accessToken)
          localStorage.setItem('userId', response.userId?.toString() || '{}')
          localStorage.setItem('userRole', response.userRole || '{}')
        }),
      );
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    this.user$.next(null);
  }
}
