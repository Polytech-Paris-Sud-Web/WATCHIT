import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Suggestion } from '../models/Suggestion.models';
import { OfflineAppService } from '../services/offline-app.service';
import { ApiService } from '../services/api.service';
import { RefreshSuggestionService } from '../services/refresh-suggestion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { SuggestionType } from '../models/SuggestionType.models';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
	selector: 'suggestionRecue',
	templateUrl: './suggestion-recue.component.html',
	styleUrls: ['./suggestion-recue.component.scss']
})
export class SuggestionRecueComponent implements OnInit, OnDestroy {

	@Input() data: Suggestion;
	@Input() isSuggLue: boolean;

	isOffline: boolean = false;
	pseudo: string = "";
	categorie: string = "";
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
		const pseudo = this.authService.getUserPseudo();
		if(this.data.author==pseudo){
			this.pseudo = "de Vous-même";
		}else{
			this.pseudo = "de "+this.data.author;
		}
		this.categorie = SuggestionType[this.data.type];
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	openSnackBar(message: string, action: string): void{
		this._snackBar.open(message, action, { duration: 100000 });
	}

	supprimer(): void{
		this.apiService
		.deleteSuggestion(this.data.id)
		.pipe(first())
		.subscribe(data=>{
			console.log(data);
			this.suggestions.refresh();
		},(e)=>{
			console.error(e.error);
			this.openSnackBar("Une erreur s'est produite lors de la suppression de cette suggestion... :( Réessayez plus tard ou contactez l'admin.",
				"Compris !");
		});
	}

	updateSugg():void{
		let copySugg = { ...this.data };
		copySugg.state = !copySugg.state;
		delete copySugg.updatedAt;
		delete copySugg.createdAt;
		this.apiService
		.updateSuggestion(copySugg)
		.pipe(first())
		.subscribe(data=>{
			console.log(data);
			this.suggestions.refresh();
		},(e)=>{
			console.error(e);
			this.openSnackBar("Une erreur s'est produite lors de la mise à jour de cette suggestion... :( Réessayez plus tard ou contactez l'admin.",
				"Compris !");
		});
		console.log(copySugg)
	}

	dispMessageUI(): void{
		if(this.isOffline){
			this.openSnackBar(`Vous n'êtes pas connecté à internet... Vous ne pouvez pas modifier la suggestion.`,"Compris !");
		}
	}

}
