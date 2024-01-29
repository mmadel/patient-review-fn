import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/modules/security/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = environment.baseURL + 'user'
  constructor(private http: HttpClient) { }

  create(user: User) {
    const headers = { 'content-type': 'application/json' }
    var createUserURL = environment.baseURL + 'authentication/register'
    return this.http.post(createUserURL, JSON.stringify(user), { 'headers': headers, observe: 'response' })
  }

  update(user: User){
    const headers = { 'content-type': 'application/json' }
    var updateUserURL = this.userUrl + '/update'
    return this.http.post(updateUserURL, JSON.stringify(user), { 'headers': headers, observe: 'response' })
  }
  get() {
    return this.http.get<User[]>(`${this.userUrl}` + '/find', { observe: 'response' })
  }
  getById(id:string | null) {
    return this.http.get<User>(`${this.userUrl}` + '/find/userId/' + id)
  }

  delete(id:string | null) {
    return this.http.delete(`${this.userUrl}` + '/delete/userId/' + id)
  }
}
