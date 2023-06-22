import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinic } from '../../models/clinic.model';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private userUrl = environment.baseURL + 'clinic'
  public selectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public filterDate$: BehaviorSubject<number[] | null> = new BehaviorSubject<number[] | null>(null);
  constructor(private htpClient: HttpClient) { }
  
  getByUserId(userId: number) {
    return this.htpClient.get<Clinic[]>(`${this.userUrl}` + '/find/userId/' + userId, { observe: 'response' })
  }
  create(clinic: Clinic) {
    const headers = { 'content-type': 'application/json' }
    var createClinicClinic = this.userUrl +'/create'
    return this.htpClient.post(createClinicClinic, JSON.stringify(clinic), { 'headers': headers, observe: 'response' })
  }
}
