import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  msg: BehaviorSubject<string[]> = new BehaviorSubject([]);
  msgObservable = this.msg.asObservable();

  constructor() { }

  setMsg(msg): void {
    this.msg.next(msg);
  }

  getMsg(): Observable<string[]> {
    return this.msgObservable;
  }

  initNav(isAdmin: boolean) {

  }

}
