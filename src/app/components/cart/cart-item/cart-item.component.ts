import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/ProductModel';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() product: ProductModel = new ProductModel();
  constructor(public usersService: UsersService, public productsService: ProductsService, public cartsService: CartsService) { }

  ngOnInit(): void {
  }

  public removeFromCart(product: ProductModel) {
    let observable = this.cartsService.removeFromCart(product);

    observable.subscribe(() => {
      let observable = this.cartsService.getCartItems();

      observable.subscribe(cartItems => {

        this.cartsService.cartItems = cartItems;
        this.cartsService.total = this.cartsService.total - product.totalPrice;

      }, serverErrorResponse => alert(serverErrorResponse.error.error));

    }, serverErrorResponse => alert(serverErrorResponse.error.error));


  }
}
