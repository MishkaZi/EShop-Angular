import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public firstStepRegister: FormGroup;
  public passwords: FormGroup;

  public id: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;

  public errorFromHttpRequest: string = '';

  public shopState: string;
  public errorMessage: string;

  constructor(
    public stateService: ShopStateService,
    public usersService: UsersService,
    private router: Router
  ) {
    this.id = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{9}'),
    ]);

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(
        "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
      ),
    ]);

    this.password = new FormControl('', [
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.required,
    ]);

    this.confirmPassword = new FormControl('', [
      Validators.min(8),
      Validators.max(12),
      Validators.required,
    ]);

    this.firstStepRegister = new FormGroup({
      email: this.email,
      password: this.password,
      id: this.id,
      confirmPassword: this.confirmPassword,
    });
  }

  ngOnInit(): void { }

  public firstStageRegister(): void {
    let observable = this.usersService.firstStepRegister(
      this.usersService.userDetails
    );

    observable.subscribe(
      () => {
        this.errorMessage = '';
      },
      (serverErrorResponse) =>
        (this.errorMessage = serverErrorResponse.error.error)
    );

  }
}
