import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/ProductModel';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  public amount: number = 0;
  @Input() product: ProductModel = new ProductModel();
  public productToAdd: ProductModel;

  constructor(
    public cartsService: CartsService,
    public usersService: UsersService,
    public productsService: ProductsService,
    public shopStateService: ShopStateService
  ) {}

  ngOnInit(): void {}

  public addToCart() {
    if (this.amount < 0) {
      this.amount = Math.abs(this.amount);
    }

    //If product already in cart
    let ifInCart = false;
    if (
      this.cartsService.cartItems.some((item) => item.id === this.product.id)
    ) {
      ifInCart = true;
      let oldProduct = this.cartsService.cartItems.find(
        (product) => product.id === this.product.id
      );

      this.cartsService.total -= oldProduct.totalPrice;
    }

    if (!ifInCart) {
      let productToAdd = {
        amount: this.amount,
        totalPrice: this.amount * this.product.price,
        productId: this.product.id,
        image: this.product.image,
        productName: this.product.productName,
      };
      let observable = this.cartsService.addToCart(productToAdd);

      observable.subscribe(
        (newProductInCart) => {
          //Get updated cart items
          let observable = this.cartsService.getCartItems();

          observable.subscribe(
            (cartItems) => {
              this.cartsService.cartItems = cartItems;
              this.cartsService.total += newProductInCart.totalPrice;
            },
            (serverErrorResponse) => alert(serverErrorResponse.error.error)
          );
        },
        (serverErrorResponse) => alert(serverErrorResponse.error.error)
      );
    } else if (ifInCart) {
      let productToAdd = {
        amount: this.amount,
        totalPrice: this.amount * this.product.price,
        productId: this.product.id,
        image: this.product.image,
        productName: this.product.productName,
      };
      let observable = this.cartsService.updateOnCart(productToAdd);

      observable.subscribe(
        (newProductInCart) => {
          //Get updated cart items
          let observable = this.cartsService.getCartItems();

          observable.subscribe(
            (cartItems) => {
              this.cartsService.cartItems = cartItems;
              this.cartsService.total += newProductInCart.totalPrice;
            },
            (serverErrorResponse) => alert(serverErrorResponse.error.error)
          );
        },
        (serverErrorResponse) => alert(serverErrorResponse.error.error)
      );
    }
  }
}
