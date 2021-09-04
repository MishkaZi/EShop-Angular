import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categories: CategoryModel[];
  constructor(public productsService: ProductsService, public categoriesService: CategoriesService) { }

  ngOnInit(): void {
    let observable = this.categoriesService.getCategories();

    observable.subscribe(allCategories => {
      this.categories = allCategories;

    },
      serverErrorResponse => alert(serverErrorResponse.error.error));
  }


  filterCategories(categoryId: number) {
    this.productsService.productsCategory = categoryId;
    let observable = this.productsService.getProductsByCategory(this.productsService.productsCategory);

    observable.subscribe(
      (productsList) => {
        this.productsService.products = productsList;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showAllProducts() {
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
