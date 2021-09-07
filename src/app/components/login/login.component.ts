import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuccessfulLoginServerResponse } from 'src/app/models/SuccessfulLoginServerResponse';
import { UsersService } from 'src/app/services/users.service';
import { UserModel } from '../../models/UserModel';
import { ShopStateService } from '../../services/shop-state.service';

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
    public shopStateService: ShopStateService
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
        sessionStorage.setItem(
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
        // Reaching here means that the server had failed
        // serverErrorResponse is the object returned from the ExceptionsHandler
        alert(
          'Error! Status: ' +
          serverErrorResponse.status +
          ', Message: ' +
          serverErrorResponse.message
        );
      }
    );
  }
}
