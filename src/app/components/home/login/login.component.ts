import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public userDetails!: FormGroup;
  public email!: FormControl;
  public password!: FormControl;

  public error: string = '';
  
  constructor(
    private usersService: UsersService,
    private router: Router,
    public shopStateService: ShopStateService,
    public cartsService: CartsService
  ) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.required,
    ]);
    this.userDetails = new FormGroup({ email: this.email, password: this.password });
  }

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
    const loginObservable = this.usersService.login(this.userDetails.value, userId);
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
        this.error = serverErrorResponse.error.error;
      }
    );
  }

  private getCart(): void {
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
}
