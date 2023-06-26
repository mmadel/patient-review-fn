import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  public reviewCounter$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  constructor() { }
}
