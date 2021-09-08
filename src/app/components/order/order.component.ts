import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public usersDetails: UserModel;

  public orderForm!: FormGroup;
  public city!: FormControl;
  public address!: FormControl;
  public shippingDate!: FormControl;
  public creditCard!: FormControl;

  constructor(public usersService: UsersService, public cartsService: CartsService,
    public ordersService: OrdersService, public router: Router) {

  }

  ngOnInit(): void {
    let observable = this.usersService.getUserDetails();

    observable.subscribe(
      (usersDetails) => {
        this.usersDetails = usersDetails;
        console.log(usersDetails);
      },
      (error) => {
        console.log(error);
      }
    );

    this.address = new FormControl("", Validators.required);
    this.city = new FormControl("", Validators.required);
    this.shippingDate = new FormControl("", Validators.required);
    this.creditCard = new FormControl("", [Validators.pattern('[0-9]{4}'), Validators.required])
    this.orderForm = new FormGroup({ address: this.address, city: this.city, shippingDate: this.shippingDate, creditCard: this.creditCard })

  }

  public makeOrder() {

  }

  
}
