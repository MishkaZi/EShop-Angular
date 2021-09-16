import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopStateService } from 'src/app/services/shop-state.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public categories: CategoryModel[];

  public error: string = '';


  constructor(
    public productsService: ProductsService,
    public categoriesService: CategoriesService,
    public shopStateService: ShopStateService
  ) {}

  ngOnInit(): void {
    let observable = this.categoriesService.getCategories();

    observable.subscribe(
      (allCategories) => {
        this.categories = allCategories;
      },
      (serverErrorResponse) => {
        this.error = serverErrorResponse.error.error;
      }
    );
  }

  filterCategories(categoryId: number) {
    this.productsService.productsCategory = categoryId;
    let observable = this.productsService.getProductsByCategory(
      this.productsService.productsCategory
    );

    observable.subscribe(
      (productsList) => {
        this.productsService.products = productsList;
      },
      (serverErrorResponse) => {
        this.error = serverErrorResponse.error.error;
      }
    );
  }

  showAllProducts() {
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

  showHideCart() {
    if (this.shopStateService.cartShowHide === true) {
      this.shopStateService.cartShowHide = false;
    } else {
      this.shopStateService.cartShowHide = true;
    }
  }
}
