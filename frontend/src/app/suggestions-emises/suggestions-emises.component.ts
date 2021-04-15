import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Suggestion } from '../models/Suggestion.models';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
	selector: 'suggestionsEmises',
	templateUrl: './suggestions-emises.component.html',
	styleUrls: ['./suggestions-emises.component.scss']
})
export class SuggestionsEmisesComponent implements OnInit, OnDestroy {

	@Input() refresh: Subject<any>;
	suggestions: Array<Suggestion> = [];
	suggestionsNonLues: Array<Suggestion> = [];
	suggestionsLues: Array<Suggestion> = [];
	title: string = "Suggestions émises";
	favicon: string = "send";
	finished: boolean = false;
	regularDistribution = 100 / 3 + '%';
	subscriptions: Subscription[] = [];


	constructor(private apiService: ApiService,
		private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.subscriptions.push(
			this.refresh.subscribe(event => {
				this.getSuggestions();
		}));
		//this.getSuggestions();
		this.subscriptions.push(
			this.route.data.subscribe((data: { sentSuggestions: Suggestion[] }) => {
				this.suggestions = data.sentSuggestions;
				this.finished = true;
				this.displaySuggestions(data.sentSuggestions);
		}));
	}

	getSuggestions(): void{ 
		this.apiService
		.getSentSuggestions()
		.pipe(first())
		.subscribe((s)=>{
			this.suggestions = s;
			this.finished = true;
			this.displaySuggestions(s);
		}, (e)=>{
        this.finished = false;
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
			if(s.author != s.owner){
				// Ne pas afficher dans la rubrique Suggestion émises 
				// une auto suggestion. Elle ne sera affichée qu'une seule fois 
				// dans suggestions reçues
				s.updatedAt = this.formatTimeDate(s.updatedAt);
				s.createdAt = this.formatTimeDate(s.createdAt);
				if(s.state){ //Lue
					this.suggestionsLues.push(s);
				}else{// non lue
					this.suggestionsNonLues.push(s);
				}
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
