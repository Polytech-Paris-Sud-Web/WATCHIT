import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of as observableOf} from "rxjs";
import { ApiService } from '../api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public apiService: ApiService) { }
  helperJWT = new JwtHelperService();
  @Output() 
  LoggedIn: EventEmitter<any> = new EventEmitter();

  public logUser(pseudo: string): Observable<boolean>{
  	let subject = new Subject<boolean>();
  	this.apiService.logUser(pseudo).pipe(first()).subscribe((data)=>{
  		if(!this.helperJWT.isTokenExpired(data.token)){//vérification de la validité du token
  			localStorage.setItem('access_token', data.token);
        this.LoggedIn.emit('Logged In');
        subject.next(true);
      }else{
       subject.next(false);
     }
   });
  	return subject.asObservable();
  }

  public isAuthenticated(): boolean{
  	if('access_token' in localStorage){
  		return !this.helperJWT.isTokenExpired(localStorage.getItem('access_token'));
  	}else{
  		return false;
  	}
    return false
  }

  public getUserId(): number{
    let token = localStorage.getItem('access_token');
    if(!this.helperJWT.isTokenExpired(token)){
      let decodedToken = jwt_decode(token);
      if(this.isAuthenticated()) return parseInt(decodedToken['id'], 10);
      else return null;
    }else return null;
  }

  public getUserPseudo(): string{
    let token = localStorage.getItem('access_token');
    if(!this.helperJWT.isTokenExpired(token)){
      let decodedToken = jwt_decode(localStorage.getItem('access_token'));
      if(this.isAuthenticated()) return decodedToken['pseudo'];
      else return null;
    }else return null;
  }

}
