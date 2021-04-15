import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) { }
  secondes: number = 10;

  ngOnInit(): void {
  	setTimeout(()=>{
  		this.router.navigate(['']);
  	}, 10000);
  	let decrement = setInterval(()=>{
  		if(this.secondes > 0) this.secondes -= 1;
  		else clearTimeout(decrement);
  	}, 1000);
  }

}
