import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../models/user.models';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { OfflineAppService } from '../services/offline-app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private api: ApiService, 
               private authService: AuthService, 
               private router: Router, 
               private offlineService: OfflineAppService,
               private _snackBar: MatSnackBar) { }
  
  users : User[];
  myControl = new FormControl();
  filteredOptions: Observable<User[]>;

  ngOnInit(): void {
    //Redirection si connecté
    if(this.authService.isAuthenticated()) this.router.navigate(['']);

  	this.api.getUsers().pipe(first()).subscribe((users)=>{
  		this.users = users;
  		this.filteredOptions = this.myControl.valueChanges.pipe(
  			startWith(''),
  			map(value => this._filter(value))
  			);
  	});
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(option => option.pseudo.toLowerCase().indexOf(filterValue) === 0);
  }

  updateMySelection(event: any){
  	let pseudo = this.myControl.value;
  	this.authService.logUser(pseudo).pipe(first()).subscribe((data)=>{
      if(data) this.router.navigate(['']);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 100000 });
  }

}
