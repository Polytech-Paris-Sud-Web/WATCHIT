import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../models/User.models';
import { LoginMessage } from '../models/LoginMessage.models';
import { Suggestion, SuggestionUpdate } from '../models/Suggestion.models';
import { Errors } from '../models/Errors.models';
import { AuthService  } from './auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  apiURL = 'https://rayanlarozepolytech.alwaysdata.net/backendWatchit/api/'; 
  //apiURL = 'api/'; 
  // Configuration d'un proxy pour routage des flux http://localhost:4200/api/
  // vers http://localhost:3000/api/ pour résoudre les pbs CORS (voir config /src/proxy.config.json)
  

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL+"users/");
  }

  public logUser(pseudo: string): Observable<LoginMessage> {
    const body = { "pseudo": pseudo };
    return this.http.post<LoginMessage>(this.apiURL+"auth/login/pseudo", body);
  }

  // ******************************************

  public getFollow(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL+"friend/follow");
  }

  public getFollowed(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL+"friend/followed");
  }

  public unfollow(u:User){
    console.log("unfollowing");
    return this.http.delete<Errors | {}>(this.apiURL+"friend/"+u.pseudo);
  }

  public follow(u:User){
    console.log("following");
    let body = {
      "pseudoAmi":u.pseudo
    };
    return this.http.post<Errors | {}>(this.apiURL+"friend/",body);
  }

  // ******************************************


  public getMySuggestions(): Observable<Suggestion[]>{
    return this.http.get<Suggestion[]>(this.apiURL+"Suggestion/");
  }

  public getSentSuggestions(): Observable<Suggestion[]>{
    return this.http.get<Suggestion[]>(this.apiURL+"Suggestion/emise");
  }

  public addSuggestion(dest: number, commentaire: string, 
                        nom: string, type: number, id: number): Observable<Errors | {}>{
    let body = {
      "commentaire":commentaire,
      "name": nom,
      "type": type,
      "author": id, 
      "owner": dest
    };
    return this.http.post<Errors | {}>(this.apiURL+"Suggestion/", body);
  }

  public deleteSuggestion(id: number): Observable<Errors | {}>{
    return this.http.delete<Errors | {}>(this.apiURL+`Suggestion/${id}`);
  }

  public updateSuggestion(body: SuggestionUpdate): Observable<Errors | {}>{
    return this.http.put<Errors | {}>(this.apiURL+`Suggestion/`, body);
  }

  public getFriendSuggestions(pseudo: string): Observable<Errors | Suggestion[]>{
    return this.http.get<Errors | Suggestion[]>(this.apiURL+`Suggestion/friend/${pseudo}`);
  }


  
}
