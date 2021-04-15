import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { User } from '../models/User.models';
import { AuthService } from '../services/auth/auth.service';
import { SuggestionType } from '../models/SuggestionType.models';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-popup-ajout-suggestion',
  templateUrl: './popup-ajout-suggestion.component.html',
  styleUrls: ['./popup-ajout-suggestion.component.scss']
})
export class PopupAjoutSuggestionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupAjoutSuggestionComponent>, 
  			private apiService: ApiService,
  			private authService: AuthService,
        private _snackBar: MatSnackBar) { }

  listeAmi: User[];
  id: number;
  suggestionType = SuggestionType; 
  AddForm = new FormGroup({
    destinataire : new FormControl(''),
    nom : new FormControl(''),
    type : new FormControl(''),
    commentaire : new FormControl(''),
  });


   ngOnInit(): void {
  	//Récupérer listes amis 
  	this.apiService
    .getFollowed()
    .pipe(first())
    .subscribe((followed)=>{
  		this.listeAmi = followed;
  	});

  	//Récupérer son id 
  	this.id = this.authService.getUserId();
  }

  onSubmit(): void{
    let {destinataire, commentaire, nom, type } = this.AddForm.value;
    let _type: any = this.suggestionType[type];
    this.apiService.addSuggestion(destinataire, commentaire, nom, _type, this.id)
    .pipe(first())
    .subscribe(
      (data)=>{
        this.openSnackBar("Votre suggestion est rajoutée :)", "OK !");
        this.closeDialog([ { refresh :true } ]);
      },(e)=>{
        console.error(e.error);
        this.openSnackBar("Une erreur s'est produite lors de l'ajout de votre suggestion... :( Réessayez plus tard ou contactez l'admin.",
                          "Compris !");
      }
    );
  }

  closeDialog(data: Array<any>): void{
    this.dialogRef.close(data); 
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 100000 });
  }

}

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
}