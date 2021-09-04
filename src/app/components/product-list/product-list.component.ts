import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  constructor(public productsService: ProductsService) { }


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

}
