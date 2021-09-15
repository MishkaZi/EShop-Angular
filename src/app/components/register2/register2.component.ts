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
  public finalStepRegister: FormGroup;
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

  public error: string = '';

  constructor(
    public stateService: ShopStateService,
    public usersService: UsersService,
    private router: Router
  ) {
    this.city = new FormControl('', Validators.required);
    this.street = new FormControl('', Validators.required);
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.finalStepRegister = new FormGroup({
      city: this.city,
      street: this.street,
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  ngOnInit(): void {
    if (this.usersService.firstStepRegisterCompleted === false) {
      this.router.navigate(['/register']);
    }
  }

  public register(): void {
    const completeUserDetails = {
      ...this.usersService.firstStageUserDetails,
      ...this.finalStepRegister.value,
    };

    let observable = this.usersService.register(completeUserDetails);

    observable.subscribe(
      () => this.router.navigate(['/home']),
      (serverErrorResponse) => (this.error = serverErrorResponse.error.error)
    );
  }

  public previousStage() {
    this.usersService.firstStepRegisterCompleted = false;
  }
}
