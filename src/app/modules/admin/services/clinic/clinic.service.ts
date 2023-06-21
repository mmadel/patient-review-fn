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
}
