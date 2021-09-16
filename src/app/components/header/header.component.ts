import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public searchInput: string = '';
  public error: string = '';


  constructor(
    public usersService: UsersService,
    public shopStateService: ShopStateService,
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public router: Router
  ) {
    this.searchInput = '';
  }

  ngOnInit(): void {
    this.usersService.userFirstName = localStorage.getItem('userFirstName');
  }

  public logout(): void {
    let token = localStorage.getItem('token');

    let observable = this.usersService.logout(token);
    observable.subscribe(
      () => {
        this.shopStateService.isLoggedIn = false;
        this.usersService.isAdmin = false;

        this.usersService.userFirstName = '';
        this.usersService.userDetails = {};
        this.shopStateService.orderPressed = false;

        localStorage.clear();
        this.router.navigate(['/home']);
      },

      (serverErrorResponse) => {
        this.error = serverErrorResponse.error.error;
      }
    );
  }

  public searchProduct(): void {
    if (this.searchInput == '') {
      return;
    }
    let observable = this.productsService.searchProduct(this.searchInput);
    observable.subscribe(
      (products) => {
        this.productsService.products = products;
        this.searchInput = '';
      },
      (serverErrorResponse) => {
        this.error = serverErrorResponse.error.error;
      }
    );
  }
}
