import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/CartModel';
import { CartsService } from 'src/app/services/carts.service';
import { ShopStateService } from 'src/app/services/shop-state.service';
@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css'],
})
export class GeneralInfoComponent implements OnInit {
  public amountOfProducts: number;
  public amountOfOrders: number;

  public error: string = '';


  constructor(
    public shopStateService: ShopStateService,
    public cartsService: CartsService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let observable = this.cartsService.getCart();

      observable.subscribe(
        (cart) => {
          cart
            ? (this.cartsService.cart = cart)
            : (this.cartsService.cart = new CartModel());
        },
        (serverErrorResponse) => {
          this.error = serverErrorResponse.error.error;
        }
      );
    }
    if (!this.amountOfOrders) {
      const observable = this.shopStateService.getState();


      observable.subscribe(
        (shopState) => {
          shopState = shopState.map((item: number) => Object.values(item)[0]);
          this.amountOfProducts = shopState[0];
          this.amountOfOrders = shopState[1];
        },
        (serverErrorResponse) => {
          this.error = serverErrorResponse.error.error;
        }
      );
    }
  }
}
