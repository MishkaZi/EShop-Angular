import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private searchInput: string;

  constructor(
    public shopStateService: ShopStateService,
    public cartsService: CartsService,
    private productsService: ProductsService,
    public usersService: UsersService,
    private router: Router
  ) {
    this.searchInput = '';
  }

  ngOnInit(): void {
    // There's an open cart for this customer
    if (this.cartsService.cart?.status=='open') {
      this.getCartItems();

      // Page was refreshed
    } else if (!this.cartsService.cart) {
      this.getCart();

      // First time customer entering this page
    } else {
      this.createNewCart();
    }

  }

  // PRIVATES
  private getCart(): void {
    let observable = this.cartsService.getCart();

    observable.subscribe(cart => {

      if (cart.status == "close") {
        this.createNewCart();

      } else {
        this.cartsService.cart = cart;
        this.getCartItems();
      }

    }, serverErrorResponse => alert(serverErrorResponse.error.error));

  }

  private getCartItems(): void {
    let observable = this.cartsService.getCartItems();

    observable.subscribe(cartItems => {
      
      this.cartsService.cartItems = cartItems;
      cartItems.map(product => this.cartsService.total += product.totalPrice);      

    }, serverErrorResponse => alert(serverErrorResponse.error.error));

  }

  private createNewCart(): void {
    let currentDate = new Date();
    let observable = this.cartsService.createCart(currentDate);

    observable.subscribe(cart =>
      this.cartsService.cart = cart,
      serverErrorResponse => alert(serverErrorResponse.error.error)
    );
  }

  // PUBLICS
  public emptyCart(): void {
    let observable = this.cartsService.emptyCart();

    observable.subscribe(() => {
      this.productsService.products.map(product => product.amount != 0 && (product.amount = 0));
      this.cartsService.cartItems = [];
      this.cartsService.total = 0;

    }, serverErrorResponse => alert(serverErrorResponse.error.error));

  }

  // public moveToOrder(): void {
  //   this.stateService.showSuccessCover = true;

  //   setTimeout(() => {
  //     this.stateService.showSuccessCover = false;
  //     this.stateService.isOrdering = true;
  //     this.stateService.isAsidePanelOpen = false;

  //     this.router.navigate(["/customers/order"]);
  //   }, 700)
  // }

  // public backShopping(): void {
  //   // Reset
  //   this.searchInput = '';
  //   this.stateService.isOrdering = false;
  //   this.router.navigate(["/customers/products"]);

  //   // Resize cart
  //   this.stateService.isMobileScreen
  //     ? this.stateService.isAsidePanelOpen = false
  //     : this.stateService.isAsidePanelOpen = true;
  // }

  public searchInCart(): void {
    let cartItems = this.cartsService.cartItems;

    let results = cartItems.map(item => (
      item.productName.includes(this.searchInput.toLowerCase()) && item.productName
    ));

    this.cartsService.searchInCartResults = results;
  }


  public openOrder() {
    if (this.shopStateService.orderPressed === true) {
      this.shopStateService.orderPressed = false;
    }
    else {
      this.shopStateService.orderPressed = true;

    }
  }

}
