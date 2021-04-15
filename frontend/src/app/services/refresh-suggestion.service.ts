import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class RefreshSuggestionService {
	refreshSignal: Subject<boolean> = new Subject<boolean>();
	constructor() { }


	refresh(): void{
		this.refreshSignal.next(true);
	}
}
