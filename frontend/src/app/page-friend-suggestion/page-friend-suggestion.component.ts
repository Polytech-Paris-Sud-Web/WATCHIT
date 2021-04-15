import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupAjoutSuggestionComponent } from '../popup-ajout-suggestion/popup-ajout-suggestion.component';
import { OfflineAppService } from '../services/offline-app.service';
import { Subject, Subscription} from 'rxjs';
import { RefreshSuggestionService } from '../services/refresh-suggestion.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-page-friend-suggestion',
  templateUrl: './page-friend-suggestion.component.html',
  styleUrls: ['./page-friend-suggestion.component.scss']
})
export class PageFriendSuggestionComponent implements OnInit, OnDestroy {

	pseudo: string;
	isOffline:boolean = false;
	refreshSignal:Subject<any> = new Subject();
  subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private offlineService: OfflineAppService,
    private suggestions: RefreshSuggestionService) {
    this.route.params.pipe(first()).subscribe( (params) => {
      if (params['pseudo']){
        this.pseudo = params['pseudo'];
      }
    }) 
  }

  notifySuggestionComponent() {
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