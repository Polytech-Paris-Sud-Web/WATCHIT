import { Component, OnDestroy } from '@angular/core';
import {Observable,of, from, Subscription, fromEvent, Subject, Observer, merge  } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfflineAppService } from './services/offline-app.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{

  offlineEvent: Observable<Event>;
  onlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  SideNavButton: string[] = ['Suggestions', 'Amis'];
  SideNavUrl: string[] = ['/', '/friends'];

  constructor(private _snackBar: MatSnackBar, 
    private offlineService: OfflineAppService,
    private router: Router){}

  ngOnInit(): void {
    this.handleAppConnectivityChanges();
    this.subscriptions.push(this.offlineService.checkOnline().subscribe(isOnline => {
        if(isOnline)this.offlineService.onlinePush();
        else this.offlineService.offlinePush();
      })
    );

  }

  private handleAppConnectivityChanges(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      if(this.router.url === "/login"){
        window.location.reload();
      }
      this.openSnackBar("Youppi ! L'application est de nouveau connectée à internet :) "
        + "Toutes les actions sont à nouveau accessible.", 
        "Compris");
      this.offlineService.onlinePush();
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      if(this.router.url === "/login"){
        this.openSnackBar("Oups... Il semble que vous avez été déconnecté :( \n"
          +"Veuillez récupérer votre connexion internet pour vous connecter.", 
          "Compris");
      }else{
        this.openSnackBar("Oups... Il semble que vous avez été déconnecté :( \n"
          +"Certaines actions de l'application ne sont plus disponible.", 
          "Compris");
      }
      this.offlineService.offlinePush();

    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 20000 });
  }

  
}
