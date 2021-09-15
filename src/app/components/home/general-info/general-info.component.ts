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

  constructor(
    public shopStateService: ShopStateService,
    public cartsService: CartsService
  ) {}

  ngOnInit(): void {
    if (!this.amountOfOrders) {
      const observable = this.shopStateService.getState();

      observable.subscribe(
        (shopState) => {
          console.log(shopState);

          shopState = shopState.map((item: number) => Object.values(item)[0]);
          this.amountOfProducts = shopState[0];
          this.amountOfOrders = shopState[1];
        },
        (serverErrorResponse) => alert(serverErrorResponse.error.error)
      );
    }
  }
}
