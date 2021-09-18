import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductsService } from 'src/app/services/products.service';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public error: string = '';


  constructor(public router: Router, public productsService: ProductsService, public userService: UsersService, public shopStateService: ShopStateService) { }


  ngOnInit(): void {
    let observable = this.productsService.getProducts();

    observable.subscribe(
      (productsList) => {
        this.productsService.products = productsList;
      },
      (serverErrorResponse) => {
        this.error = serverErrorResponse.error.error;
      }
    );
  }

  public updateProduct(product: ProductModel) {
    if (this.userService.isAdmin) {
      this.shopStateService.productToUpdate = product;
      if (this.shopStateService.updateClicked === true && this.shopStateService.productToUpdate === undefined) {

        this.shopStateService.productToUpdate = product;
        this.shopStateService.updateClicked = false;
        this.shopStateService.showAdd = false;
      }
      else {
        this.shopStateService.updateClicked = true;
        window.history.back();

      }
    }
  }


}
