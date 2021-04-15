import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupAjoutSuggestionComponent } from '../popup-ajout-suggestion/popup-ajout-suggestion.component';
import { OfflineAppService } from '../services/offline-app.service';
import { Subject } from 'rxjs';
import { RefreshSuggestionService } from '../services/refresh-suggestion.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  constructor(public dialog: MatDialog, 
    private offlineService: OfflineAppService,
    private suggestions: RefreshSuggestionService) { }

  isOffline: boolean = false;
  refreshSignal:Subject<any> = new Subject();
  subscriptions: Subscription[] = [];

  notifySuggestionComponent(): void {
    this.refreshSignal.next(true);
  }
  
  ngOnInit(): void{  
    this.subscriptions.push(
      this.offlineService.checkOnline().subscribe(isOnline => {
        this.isOffline = !isOnline;
      })
    );
    this.subscriptions.push(
      this.offlineService.offlineStatus.subscribe(data=>{
        this.isOffline = data;
      })
    );
    this.subscriptions.push(
      this.suggestions.refreshSignal.subscribe(data=>{
        console.log(data, "got refresh signal");
        this.notifySuggestionComponent();
      })
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupAjoutSuggestionComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      console.log('The dialog was closed', result);
      if(JSON.stringify(result) === JSON.stringify([{refresh: true}]) ){
        this.notifySuggestionComponent();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
