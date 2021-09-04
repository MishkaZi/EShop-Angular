import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css'],
})
export class Register2Component implements OnInit {
  public formRegistrationSecond: FormGroup;
  //Israely cities by population
  public cities: string[] = [
    'Jerusalem',
    'Tel Aviv',
    'Haifa',
    'Ashdod',
    'Rishon LeZiyyon',
    'Petah Tikva',
    'BeerSheba',
    'Netanya',
    'Holon',
    'Bnei Brak',
  ].sort((a, b) => (a == b ? 0 : a < b ? -1 : 1));

  public city: FormControl;
  public street: FormControl;
  public firstName: FormControl;
  public lastName: FormControl;

  constructor(
    public stateService: ShopStateService,
    public usersService: UsersService,
    private router: Router
  ) {
    this.city = new FormControl('', Validators.required);
    this.street = new FormControl('', Validators.required);
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.formRegistrationSecond = new FormGroup({
      city: this.city,
      street: this.street,
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  ngOnInit(): void {}

  public register(): void {
    let observable = this.usersService.register(this.usersService.userDetails);

    observable.subscribe(
      () => this.router.navigate(['/home']),
      (serverErrorResponse) => alert(serverErrorResponse.error.error)
    );
  }
}
