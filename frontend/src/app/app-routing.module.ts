import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent  } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { FriendManagementComponent } from './friend-management/friend-management.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';
import { MySuggestionResolver } from './resolver/my-suggestion.resolver';
import { SentSuggestionResolver } from './resolver/sent-suggestion.resolver';
import { PageFriendSuggestionComponent } from './page-friend-suggestion/page-friend-suggestion.component'; 

const routes: Routes = [
	{ 
		path: '', 
		component: HomeComponent, 
		canActivate : [AuthGuard],
		resolve: {
			mySuggestions: MySuggestionResolver,
			sentSuggestions: SentSuggestionResolver
		}
	},
	{ 
		path: 'home', 
		component: HomeComponent, 
		canActivate : [AuthGuard],
		resolve: {
			mySuggestions: MySuggestionResolver,
			sentSuggestions: SentSuggestionResolver
		} 
	},
	{ path: 'login', component: LoginComponent },
	{ path: 'friends', component:FriendManagementComponent, canActivate : [AuthGuard]},
	{ path: 'friendSuggestion/:pseudo', component:PageFriendSuggestionComponent, canActivate : [AuthGuard]},
	{ path: '**', component: PageNotFoundComponent, canActivate : [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
