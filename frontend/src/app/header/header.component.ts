import { Component, OnInit, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { OfflineAppService } from '../services/offline-app.service';
import { Subscription } from 'rxjs';


@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

	constructor(private authService: AuthService, 
		private router: Router,
		private apiService: ApiService,
		private offlineService: OfflineAppService) { }

	userConnected: string = "Non connecté";
	isOffline = false;
	@Output() openSideNav = new EventEmitter<boolean>();
	isNotLimitedScreenWidth: boolean = true;
	subscriptions: Subscription[] = [];

	ngOnInit(): void {
		this.subscriptions.push(this.offlineService.checkOnline().subscribe(isOnline => {
			this.isOffline = !isOnline;
		}));
		this.refreshUserName();
		this.subscriptions.push(this.authService.LoggedIn.subscribe((data)=>{
			this.refreshUserName();
		}));
		this.subscriptions.push(this.offlineService.offlineStatus.subscribe(data=>{
			this.isOffline = data;
		}));
		this.setMobileDisplay();
	}

	refreshUserName(): void{
		this.userConnected = this.authService.getUserPseudo(); 
	}

	logout() : void {
		delete localStorage['access_token'];
		this.refreshUserName();
		this.router.navigate(['login']);
	}

	emitEventSideNav(): void{
		this.openSideNav.emit(true);
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) { this.setMobileDisplay(); }

	setMobileDisplay(): void{
		this.isNotLimitedScreenWidth = (document.documentElement.scrollWidth <= document.documentElement.clientWidth);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}
