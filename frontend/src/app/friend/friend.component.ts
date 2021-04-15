import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Friend } from '../models/friend.models';
import { OfflineAppService } from '../services/offline-app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit, OnDestroy {

	@Input()
	friend?:Friend;

	@Output()
	toggleFollow :EventEmitter<Friend> = new EventEmitter();
	isOffline: boolean = false;
	subscriptions: Subscription[] = [];

  constructor(private offlineService: OfflineAppService) { }

  	formatTimeDate(timeDate: string): string{
		let annee = timeDate.substring(0, 4);
		let jour = timeDate.substring(8, 10);
		let mois = timeDate.substring(5, 7);
		return `membre depuis le ${jour}/${mois}/${annee}` ;
	}

  ngOnInit(): void {
  	this.subscriptions.push(this.offlineService.checkOnline().subscribe(isOnline => {
		this.isOffline = !isOnline;
	}));
	this.subscriptions.push(this.offlineService.offlineStatus.subscribe(data=>{
		this.isOffline = data;
	}));
  }

  onClick(){
  	console.log("clicked");
  	this.toggleFollow.emit(this.friend);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
