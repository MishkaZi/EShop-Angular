import { Component, OnInit } from '@angular/core';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public shopStateService: ShopStateService,public userService: UsersService) { }

  ngOnInit(): void {
  }

  public openOrder() {
    console.log(this.userService.userDetails);
    
    if (this.shopStateService.orderPressed === true) {
      this.shopStateService.orderPressed = false;
    }
    else {
      this.shopStateService.orderPressed = true;

    }
  }

}
