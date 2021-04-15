import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Suggestion } from '../models/Suggestion.models';
import { OfflineAppService } from '../services/offline-app.service';
import { ApiService } from '../services/api.service';
import { RefreshSuggestionService } from '../services/refresh-suggestion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuggestionType } from '../models/SuggestionType.models';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
	selector: 'suggestionFriend',
	templateUrl: './suggestion-friend.component.html',
	styleUrls: ['./suggestion-friend.component.scss']
})
export class SuggestionFriendComponent implements OnInit, OnDestroy {


	@Input() data: Suggestion;
	@Input() isSuggLue: boolean;
	isOffline: boolean = false;
	categorie: string = "";
	pseudo: string = "";
	isAuthorUserConnected: boolean = false;
	subscriptions: Subscription[] = [];

	constructor(private offlineService: OfflineAppService, 
		private apiService: ApiService,
		private suggestions: RefreshSuggestionService,
		private _snackBar: MatSnackBar,
		private authService: AuthService ) { }

	ngOnInit(): void {
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
		this.categorie = SuggestionType[this.data.type];
		const pseudo = this.authService.getUserPseudo();
		this.pseudo = this.data.author;
		if(pseudo === this.pseudo) this.isAuthorUserConnected = true;
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, { duration: 100000 });
	}

	supprimer(){
		this.apiService.deleteSuggestion(this.data.id).pipe(first()).subscribe(data=>{
			console.log(data);
			this.suggestions.refresh();
		},(e)=>{
			console.error(e.error);
			this.openSnackBar("Une erreur s'est produite lors de la suppression de cette suggestion... :( Réessayez plus tard ou contactez l'admin.",
				"Compris !");
		});
	}

	dispMessageUI(): void{
		if(!this.isAuthorUserConnected){
			this.openSnackBar("Vous ne pouvez pas supprimer une suggestion émise par un autre utilisateur","Compris !");
		}else if(this.isSuggLue){
			this.openSnackBar(`Vous ne pouvez pas supprimer une suggestion déjà lue. Désormais, seul ${this.data.owner} le peut.`,"Compris !");
		}else if(this.isOffline){
			this.openSnackBar(`Vous n'êtes pas connecté à internet... Vous ne pouvez pas supprimer la suggestion.`,"Compris !");
		}
	}
}
