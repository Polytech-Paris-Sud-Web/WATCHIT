import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Suggestion } from '../models/Suggestion.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Errors } from '../models/Errors.models';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
	selector: 'suggestionsFriend',
	templateUrl: './suggestions-friend.component.html',
	styleUrls: ['./suggestions-friend.component.scss']
})
export class SuggestionsFriendComponent implements OnInit, OnDestroy {

	@Input() refresh: Subject<any>;
	@Input() pseudo: string;
	suggestions: Array<Suggestion> = [];
	suggestionsNonLues: Array<Suggestion> = [];
	suggestionsLues: Array<Suggestion> = [];
	title: string = "Suggestions de votre ami";
	favicon: string = "send";
	finished: boolean = false;
	regularDistribution = 100 / 3 + '%';
	subscriptions: Subscription[] = [];


	constructor(private apiService: ApiService,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit(): void {
		this.title += ' '+ this.pseudo;
		this.subscriptions.push(this.refresh.subscribe(event => {
			this.getSuggestions();
		}));
		this.getSuggestions();
	}

	getSuggestions(): void{ 
		this.apiService.getFriendSuggestions(this.pseudo)
		.pipe(first())
		.subscribe((s: Suggestion[])=>{
			this.suggestions = s;
			this.finished = true;
			this.displaySuggestions(s);
		}, (e: Errors)=>{
			this.finished = false;
			console.log(e);
			this.router.navigate(['error404']);
		});
	}

	displaySuggestions(s: Suggestion[]): void{
		this.suggestionsLues = [];
		this.suggestionsNonLues = [];
		this.suggestions = s;
		this.seperateSuggestions();
		this.finished = true;
	}


	seperateSuggestions(): void {
		for(let s of this.suggestions){
			s.updatedAt = this.formatTimeDate(s.updatedAt);
			s.createdAt = this.formatTimeDate(s.createdAt);
			if(s.state){ //Lue
				this.suggestionsLues.push(s);
			}else{// non lue
				this.suggestionsNonLues.push(s);
			}
		}
	}

	formatTimeDate(timeDate: string): string{
		let annee = timeDate.substring(0, 4);
		let jour = timeDate.substring(8, 10);
		let mois = timeDate.substring(5, 7);
		let hhmmss = timeDate.substring(11, 19)
		return `à ${hhmmss} - le ${jour}/${mois}/${annee}` ;
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

}
