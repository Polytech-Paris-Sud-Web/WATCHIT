import { Component, OnInit } from '@angular/core';
import { Friend } from '../models/friend.models';
import { User } from '../models/user.models';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-friend-management',
  templateUrl: './friend-management.component.html',
  styleUrls: ['./friend-management.component.scss']
})
export class FriendManagementComponent implements OnInit {

	self?:User;
	friends?:Map<number, Friend>;
	users?:Map<number, Friend>;
  finishedFriend:boolean = false;
  finishedOthers:boolean = false;

  constructor(private api:ApiService, private authService:AuthService) {}

  ngOnInit(): void {
  	this.getFriends();
  	this.getAll();
  }

  getFriendValues(): Array<Friend> {
    return Array.from(this.friends.values());
  }

  getOthersValues(): Array<Friend> {
    let id = this.authService.getUserId();
    for (let key of this.users.keys()){
      if ((this.friends.has(key)) || key == id){
        this.users.delete(key);
      }
    }
    return Array.from(this.users.values());
  }

  async getFriends(){
    this.friends = new Map<number,Friend>();
    this.api.getFollow().pipe(first()).subscribe((data)=>{
      //console.log(data);
  		for (let f of data) {
  			this.friends.set(f.id, { "user":f, "follow":true, "followed":false});
  		}

      this.api.getFollowed().pipe(first()).subscribe((data)=>{
        //console.log(data);
        for (let f of data) {
          if (this.friends.has(f.id)){
            this.friends.set(f.id ,{ "user":f, "follow":true, "followed":true});
          } else {
            this.friends.set(f.id,{ "user":f, "follow":false, "followed":true});
          }
        }
        this.finishedFriend = true;
      }, (e)=>{
        this.finishedFriend = false;
      });
    }, (e)=>{
        this.finishedFriend = false;
    });
    

  }

  getAll(){
    this.users= new Map<number, Friend>();
    this.api.getUsers().pipe(first()).subscribe((data)=>{
      for (let f of data) {
        this.users.set(f.id, { "user":f, "follow":false, "followed":false});
      }
      this.finishedOthers = true;
    }, (e)=>{
      this.finishedOthers = false;
    });
  }

  toggleFollow(f){
    //console.log("emitted");
    if(f.follow){
      this.api.unfollow(f.user).pipe(first()).subscribe(
        (data)=>{
          console.log("ok");
          this.getFriends();
          this.getAll();
        },(e)=>{
          console.log("nok");
          console.log(e.error);
          //this.openSnackBar("Une erreur s'est produite lors de l'ajout de votre suggestion... :( Réessayez plus tard ou contactez l'admin.",
          //                  "Compris !")
      });
    } else {
      this.api.follow(f.user).pipe(first()).subscribe(
        (data)=>{
          console.log("ok");
          this.getFriends();
          this.getAll();
        },(e)=>{
          console.log("nok");
          console.log(e.error);
          //this.openSnackBar("Une erreur s'est produite lors de l'ajout de votre suggestion... :( Réessayez plus tard ou contactez l'admin.",
          //                  "Compris !")
      });
    }
  }
}
