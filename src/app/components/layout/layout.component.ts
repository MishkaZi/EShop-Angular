import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/CartModel';
import { CartsService } from 'src/app/services/carts.service';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public shopStateService: ShopStateService,
    public cartsService: CartsService
  ) {}

  ngOnInit(): void {
    //We have just one admin with specific id
    if (localStorage.getItem('userId') === '123456789') {
      this.usersService.isAdmin = true;
    } else if (localStorage.getItem('userId') !== '123456789') {
      this.usersService.isAdmin = false;
    } else {
      this.usersService.isAdmin = false;
    }

    if (localStorage.getItem('token')) {
      let observable = this.cartsService.getCart();

      observable.subscribe(
        (cart) => {
          cart
            ? (this.cartsService.cart = cart)
            : (this.cartsService.cart = new CartModel());
          console.log(this.cartsService.cart);
        },
        (serverErrorResponse) => {
          alert(serverErrorResponse.error.error);
        }
      );
    }
  }
}
