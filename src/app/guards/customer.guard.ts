import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ShopStateService } from '../services/shop-state.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerGuard implements CanActivate {
  public constructor(
    private router: Router,
    public usersService: UsersService,
    public shopStateService: ShopStateService

  ) { }

  public canActivate(): boolean {
    const isLoggedIn = this.shopStateService.isLoggedIn;
    const isAdmin = this.usersService.isAdmin;

    if (isLoggedIn && !isAdmin) {
      return true;
    }

    this.router.navigateByUrl('/home');
    alert('Access Denied');
    return false;
  }
}
