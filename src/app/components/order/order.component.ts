import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OrderDetailsModel } from 'src/app/models/OrderDetailsModel';
import { UserModel } from 'src/app/models/UserModel';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  public usersDetails: UserModel;

  public orderForm!: FormGroup;
  public city!: FormControl;
  public address!: FormControl;
  public shippingDate!: FormControl;
  public creditCard!: FormControl;

  public orderDetails: OrderDetailsModel = {};
  public receiptTrustedUrl: {};

  constructor(
    public usersService: UsersService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public shopStateService: ShopStateService,
    public router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    let observable = this.usersService.getUserDetails();

    observable.subscribe(
      (usersDetails) => {
        this.usersDetails = usersDetails;
      },
      (error) => {
        console.log(error);
      }
    );

    this.address = new FormControl('', Validators.required);
    this.city = new FormControl('', Validators.required);
    this.shippingDate = new FormControl('', Validators.required);
    this.creditCard = new FormControl('', [
      Validators.pattern('[0-9]{4}'),
      Validators.required,
    ]);
    this.orderForm = new FormGroup({
      address: this.address,
      city: this.city,
      shippingDate: this.shippingDate,
      creditCard: this.creditCard,
    });
  }

  public makeOrder() {
    const dateNow = new Date();
    // var date = dateNow.getFullYear()+(dateNow.getMonth()+1)+dateNow.getDate();

    let order: OrderDetailsModel = {
      finalPrice: this.cartsService.total,
      shippingCity: this.orderForm.value.city,
      shippingStreet: this.orderForm.value.address,
      orderDate: dateNow,
      shippingDate: this.orderForm.value.shippingDate,
      creditCard: this.orderForm.value.creditCard,
    };

    this.orderDetails = order;

    let observable = this.ordersService.order(order);
    console.log(observable);

    observable.subscribe(
      () => {
        this.createReceiptFile();
        // this.shopStateService.orderPressed = false;
      },
      (serverErrorResponse) => alert(serverErrorResponse)
    );
  }

  public createReceiptFile(): void {
    let receipt = `Order date: ${this.orderDetails.orderDate}: \n\n`;

    for (let item of this.cartsService.cartItems) {
      receipt += `${item.productName.toUpperCase()} - Amount: ${
        item.amount
      } - Price: ${item.totalPrice}$ \n`;
    }

    receipt +=
      `\ Total Price: ${this.orderDetails.finalPrice}$ \n` +
      `Shipping destination: ${this.orderDetails.shippingStreet}, ${this.orderDetails.shippingCity} ` +
      `Shipping date:  ${this.orderDetails.shippingDate}.\n` +
      `Thanks for buying from us ${this.usersService.userFirstName.toUpperCase()}`;

    let data = new Blob([receipt], { type: 'text/plain' });

    let receiptFileUrl = URL.createObjectURL(data);

    this.receiptTrustedUrl =
      this.sanitizer.bypassSecurityTrustUrl(receiptFileUrl);
  }

  public close() {
    this.shopStateService.orderPressed = false;
    this.cartsService.total = 0;
    this.cartsService.cartItems = [];
    this.cartsService.cart = {};

    this.router.navigate(['/home']);
  }
}
