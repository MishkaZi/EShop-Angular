import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() product: ProductModel = new ProductModel();
  constructor(public usersService: UsersService, public productsService: ProductsService,) { }

  ngOnInit(): void {
  }

  public removeFromCart(product: ProductModel) {
    console.log(product);


  }
}
