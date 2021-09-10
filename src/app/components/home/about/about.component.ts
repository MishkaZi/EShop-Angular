import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor( public stateService: ShopStateService,
    public usersService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public shopNow(){
    
  }

}
