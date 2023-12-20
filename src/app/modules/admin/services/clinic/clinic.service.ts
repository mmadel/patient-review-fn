import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinic } from '../../models/clinic.model';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private clinicUrl = environment.baseURL + 'clinic'
  public selectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public selectedClinicNormal$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public selectedClinicName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public selectedClinicNameNormal$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public filterDate$: BehaviorSubject<number[] | null> = new BehaviorSubject<number[] | null>(null);
  constructor(private htpClient: HttpClient) { }

  getByUserId(userId: number) {
    return this.htpClient.get<Clinic[]>(`${this.clinicUrl}` + '/find/userId/' + userId, { observe: 'response' })
  }
  get() {
    var findClinicClinic = this.clinicUrl + '/find'
    return this.htpClient.get<Clinic[]>(findClinicClinic, { observe: 'response' })
  }
  create(clinic: Clinic) {
    const headers = { 'content-type': 'application/json' }
    var createClinicClinic = this.clinicUrl + '/create'
    return this.htpClient.post(createClinicClinic, JSON.stringify(clinic), { 'headers': headers, observe: 'response' })
  }

  getById(id: string | null) {
    return this.htpClient.get<Clinic>(`${this.clinicUrl}` + '/find/clinicId/' + id)
  }
  delete(id: string | null) {
    var deleteClinicURL = this.clinicUrl +  '/delete/clinicId/';
    return this.htpClient.delete(deleteClinicURL + id)
  }
}
