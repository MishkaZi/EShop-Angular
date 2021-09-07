import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ProductModel } from 'src/app/models/ProductModel';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopStateService } from 'src/app/services/shop-state.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public showAdd: boolean = false;

  public addProduct!: FormGroup;
  public image!: FormControl;
  public productName!: FormControl;
  public category!: FormControl;
  public price!: FormControl;

  public formData: FormData = new FormData();
  public categories: CategoryModel[];

  constructor(public productService: ProductsService, public categoriesService: CategoriesService, public shopStateService: ShopStateService) {
    this.productName = new FormControl(this.shopStateService.updateClicked ? this.shopStateService.productToUpdate.productName : "", [Validators.required]);
    this.category = new FormControl(this.shopStateService.updateClicked ? this.shopStateService.productToUpdate.categoryId : "", [Validators.required]);
    this.price = new FormControl(this.shopStateService.updateClicked ? this.shopStateService.productToUpdate.price : "", [Validators.required, Validators.min(1)]);
    this.image = new FormControl(this.shopStateService.updateClicked ? this.shopStateService.productToUpdate.image : "", [Validators.required]);

    this.addProduct = new FormGroup({ productName: this.productName, categoryId: this.category, price: this.price, image: this.image })
  }

  ngOnInit(): void {
    let observable = this.categoriesService.getCategories();

    observable.subscribe(allCategories => {
      this.categories = allCategories;

    },
      serverErrorResponse => alert(serverErrorResponse.error.error));

  }

  public showAddProduct() {
    if (this.shopStateService.updateClicked === true) {
      this.shopStateService.updateClicked = false;
    }
    if (this.showAdd === true) {
      this.showAdd = false;

    }
    else {
      this.showAdd = true;
    }


  }

  public addProductFunc() {
    const category = this.categories.find((category: CategoryModel) => category.categoryName === this.addProduct.value.categoryId.toLowerCase()) as CategoryModel;
    this.addProduct.value.categoryId = category.id;
    console.log(this.addProduct.value);

    const observable = this.productService.addProduct(this.addProduct.value);
    observable.subscribe((HttpResponseData) => {
      console.log(JSON.stringify(HttpResponseData));

      this.showAdd = false;
    }, (HttpErrorResponse) => { alert(HttpErrorResponse) })
  }

  public updateProductFunc() {
    const category = this.categories.find((category: CategoryModel) => category.categoryName === this.addProduct.value.categoryId.toLowerCase()) as CategoryModel;
    this.addProduct.value.categoryId = category.id;
    const productToSend: ProductModel = { ...this.addProduct.value };
    Object.assign(productToSend, { id: this.shopStateService.productToUpdate.id });

    const observable = this.productService.updateProduct(productToSend);
    observable.subscribe((HttpResponseData) => {
      console.log(JSON.stringify(HttpResponseData));

      this.shopStateService.updateClicked = false;
    }, (HttpErrorResponse) => { alert(HttpErrorResponse) })
  }
}
