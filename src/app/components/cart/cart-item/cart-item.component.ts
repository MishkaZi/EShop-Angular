import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/ProductModel';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() product: ProductModel = new ProductModel();
  @Input() searchInput: string;

  public error: string = '';


  constructor(
    public shopStateService: ShopStateService,
    public usersService: UsersService,
    public productsService: ProductsService,
    public cartsService: CartsService
  ) {}

  ngOnInit(): void {}

  public removeFromCart(product: ProductModel) {
    let observable = this.cartsService.removeFromCart(product);

    observable.subscribe(
      () => {
        let observable = this.cartsService.getCartItems();

        observable.subscribe(
          (cartItems) => {
            this.cartsService.cartItems = cartItems;
            this.cartsService.total =
              this.cartsService.total - product.totalPrice;
          },
          (serverErrorResponse) =>  { this.error = serverErrorResponse.error.error;}
        );
      },
      (serverErrorResponse) =>   {this.error = serverErrorResponse.error.error;}
    );
  }

  public highlightSearchResults(): string {
    let searchInCartResults = this.cartsService.searchInCartResults;
    let inputIsntEmpty = this.searchInput != '';

    if (
      searchInCartResults.includes(this.product.productName) &&
      inputIsntEmpty
    ) {
      return 'highlighted';
    }
    return '';
  }
}
