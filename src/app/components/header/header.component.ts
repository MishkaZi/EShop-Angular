import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public searchInput: string;

  constructor(
    public usersService: UsersService,
    public shopStateService: ShopStateService,
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

        this.usersService.userFirstName = '';
        this.usersService.userDetails = {};

        localStorage.clear();
        this.router.navigate(['/home']);
      },

      (serverErrorResponse) => alert(serverErrorResponse.error.error)
    );
  }

  public searchProduct(): void {
    // if (this.searchInput == '') {
    //   return;
    // }
    // let observable = this.productsService.searchProduct(this.searchInput);
    // observable.subscribe(products => {
    //   this.productsService.products = products;
    //   this.searchInput = '';
    //   this.stateService.isSearching = true;
    // }, serverErrorResponse => alert(serverErrorResponse.error.error));
  }
}
