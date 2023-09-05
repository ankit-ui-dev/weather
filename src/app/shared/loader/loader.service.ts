import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
 
  constructor() { }
  loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
