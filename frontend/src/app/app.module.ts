import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { PopupAjoutSuggestionComponent, EnumToArrayPipe } from './popup-ajout-suggestion/popup-ajout-suggestion.component';
import { SuggestionsEmisesComponent } from './suggestions-emises/suggestions-emises.component';
import { SuggestionsRecuesComponent } from './suggestions-recues/suggestions-recues.component';
import { SuggestionEmiseComponent } from './suggestion-emise/suggestion-emise.component';
import { SuggestionRecueComponent } from './suggestion-recue/suggestion-recue.component';

//    ANGULAR MATERIAL 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FriendManagementComponent } from './friend-management/friend-management.component';
import { FriendComponent } from './friend/friend.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatListModule } from '@angular/material/list';
import { SuggestionsFriendComponent } from './suggestions-friend/suggestions-friend.component';
import { SuggestionFriendComponent } from './suggestion-friend/suggestion-friend.component';
import { PageFriendSuggestionComponent } from './page-friend-suggestion/page-friend-suggestion.component'; 


// JWT TOKEN 
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    FriendManagementComponent,
    FriendComponent,
    PopupAjoutSuggestionComponent,
    EnumToArrayPipe,
    SuggestionsEmisesComponent,
    SuggestionsRecuesComponent,
    SuggestionEmiseComponent,
    SuggestionRecueComponent,
    SuggestionsFriendComponent,
    SuggestionFriendComponent,
    PageFriendSuggestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
                               enabled: environment.production,
                                registrationStrategy: 'registerImmediately'
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule, 
    MatListModule,
  JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      allowedDomains: ["localhost:3000"],
      disallowedRoutes: [
      "localhost:3000/auth/login/pseudo", 
      "localhost:3000/auth/login/id"
      ],
    },
  }),
  ],
  exports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
