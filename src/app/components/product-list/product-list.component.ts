import { Component, OnInit } from '@angular/core';
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
  constructor(public productsService: ProductsService, public userService: UsersService, public shopStateService: ShopStateService) { }


  ngOnInit(): void {
    let observable = this.productsService.getProducts();

    observable.subscribe(
      (productsList) => {
        this.productsService.products = productsList;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public updateProduct(product: ProductModel) {
    if (this.userService.isAdmin) {
      console.log(product);
      this.shopStateService.productToUpdate = product;
      if (this.shopStateService.updateClicked === true) {
        this.shopStateService.updateClicked = false;
      }
      else {
        this.shopStateService.updateClicked = true;
      }


    }
  }


}
