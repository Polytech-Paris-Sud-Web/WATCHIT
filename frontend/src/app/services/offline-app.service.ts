import { Injectable, OnInit } from '@angular/core';
import {Observable, fromEvent, Observer, merge  } from 'rxjs';
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfflineAppService implements OnInit {

  constructor() { }

  offlineStatus: Subject<boolean> = new Subject<boolean>();

  ngOnInit(){
  	//this.offlineStatus.next(false);
  }

  offlinePush(): void{
  	this.offlineStatus.next(true);
  }
  
  onlinePush(): void{
  	this.offlineStatus.next(false);
  }

  checkOnline(): Observable<boolean>{
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
