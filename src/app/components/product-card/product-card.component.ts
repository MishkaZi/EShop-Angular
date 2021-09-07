import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductsService } from 'src/app/services/products.service';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductModel = new ProductModel();
  constructor(public usersService: UsersService, public productsService: ProductsService,) { }

  ngOnInit(): void {
  }

  showPopUp(product: ProductModel) {
    this.productsService.productPopUp = product;
  }

}
