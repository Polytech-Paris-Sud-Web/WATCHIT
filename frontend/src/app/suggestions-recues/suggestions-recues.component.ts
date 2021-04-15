import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Suggestion } from '../models/Suggestion.models';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
	selector: 'suggestionsRecues',
	templateUrl: './suggestions-recues.component.html',
	styleUrls: ['./suggestions-recues.component.scss']
})
export class SuggestionsRecuesComponent implements OnInit, OnDestroy {

	@Input() refresh: Subject<any>;
	suggestions: Array<Suggestion> = [];
	suggestionsNonLues: Array<Suggestion> = [];
	suggestionsLues: Array<Suggestion> = [];
	title: string = "Suggestions reçues";
	favicon: string = "input";
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
			this.route.data.subscribe((data: { mySuggestions: Suggestion[] }) => {
				this.suggestions = data.mySuggestions;
				this.finished = true;
				this.displaySuggestions(data.mySuggestions);
		}));
	}

	getSuggestions(): void{
		this.apiService
		.getMySuggestions()
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
