import { Injectable } from '@angular/core';
import {
	Router, Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Suggestion } from '../models/Suggestion.models';
import { ApiService } from '../services/api.service';

@Injectable({
	providedIn: 'root'
})
export class SentSuggestionResolver implements Resolve<Suggestion[]> {
	constructor(private api: ApiService){}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Suggestion[]> {
		return this.api.getSentSuggestions();
	}
}
