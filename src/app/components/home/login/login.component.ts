import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/CartModel';
import { SuccessfulLoginServerResponse } from 'src/app/models/SuccessfulLoginServerResponse';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';
import { UserModel } from '../../../models/UserModel';
import { ShopStateService } from '../../../services/shop-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userDetails: UserModel = new UserModel(0, '');

  constructor(
    private usersService: UsersService,
    private router: Router,
    public shopStateService: ShopStateService,
    public cartsService: CartsService,
  ) { }

  ngOnInit(): void {
    if (!this.shopStateService.isLoggedIn) {
      if (localStorage.getItem('userId')) {
        const userId = +JSON.parse(localStorage.getItem('userId'));
        this.login(userId);
      } else {
        return;
      }
    }
    if (this.usersService.isAdmin) {
      this.router.navigate(['/admin']);
    }
  }

  login(userId?: number): void {
    const loginObservable = this.usersService.login(this.userDetails, userId);
    loginObservable.subscribe(
      (successfulServerRequestData: SuccessfulLoginServerResponse) => {

        this.usersService.isAdmin = successfulServerRequestData.isAdmin;

        localStorage.setItem(
          'token',
          'Bearer ' + successfulServerRequestData.token + ''
        );

        
        if (successfulServerRequestData.isAdmin) {

          this.shopStateService.isLoggedIn = true;
          localStorage.setItem(
            'userFirstName',
            successfulServerRequestData.userDetails.firstName
          );
          localStorage.setItem(
            'userId',
            JSON.stringify(successfulServerRequestData.userDetails.id)
          );

          this.router.navigate(['/admin']);
          return;
        } else {
          this.shopStateService.isLoggedIn = true;
          this.getCart();
          localStorage.setItem(
            'userFirstName',
            successfulServerRequestData.userDetails.firstName
          );
          localStorage.setItem(
            'userId',
            JSON.stringify(successfulServerRequestData.userDetails.id)
          );

          this.usersService.userFirstName =
            localStorage.getItem('userFirstName');
        }
      },
      (serverErrorResponse) => {
        alert(
          'Error! Status: ' +
          serverErrorResponse.status +
          ', Message: ' +
          serverErrorResponse.message
        );
      }
    );
  }

  private getCart(): void {
    let observable = this.cartsService.getCart();

    observable.subscribe(
      (cart) => {
        console.log(cart);

        cart
          ? (this.cartsService.cart = cart)
          : (this.cartsService.cart = new CartModel());
      },
      (serverErrorResponse) => {
        alert(serverErrorResponse.error.error);
      }
    );
  }
}
