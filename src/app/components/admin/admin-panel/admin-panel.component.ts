import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ProductModel } from 'src/app/models/ProductModel';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  public addProduct!: FormGroup;
  public image!: FormControl;
  public productName!: FormControl;
  public category!: FormControl;
  public price!: FormControl;

  public categories: CategoryModel[];

  public error: string = '';
  public file!: File;
  public formData: FormData = new FormData();

  constructor(
    public productsService: ProductsService,
    public categoriesService: CategoriesService,
    public shopStateService: ShopStateService,
    public usersService: UsersService
  ) {
    this.productName = new FormControl(
      this.shopStateService.updateClicked
        ? this.shopStateService.productToUpdate.productName
        : '',
      [Validators.required]
    );
    this.category = new FormControl(
      this.shopStateService.updateClicked
        ? this.shopStateService.productToUpdate.categoryName
        : 'phones',
      [Validators.required]
    );
    this.price = new FormControl(
      this.shopStateService.updateClicked
        ? this.shopStateService.productToUpdate.price
        : '',
      [Validators.required, Validators.min(1)]
    );
    this.image = new FormControl('', [Validators.required]);

    this.addProduct = new FormGroup({
      productName: this.productName,
      categoryName: this.category,
      price: this.price,
      image: this.image,
    });
  }

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

  public showAddProduct() {
    window.history.back();
    this.shopStateService.productToUpdate = {};
    if (this.shopStateService.updateClicked === true) {
      this.shopStateService.updateClicked = false;
    }
    if (this.shopStateService.showAdd === true) {
      this.shopStateService.showAdd = false;
    } else {
      this.shopStateService.showAdd = true;
    }
  }

  public addProductFunc() {
    const category = this.categories.find(
      (category: CategoryModel) =>
        category.categoryName ===
        this.addProduct.value.categoryName.toLowerCase()
    ) as CategoryModel;

    this.formData.append('productImage', this.file, this.file.name);

    this.formData.append('productName', this.addProduct.value.productName);
    this.formData.append('categoryId', category.id.toString());
    this.formData.append('price', this.addProduct.value.price);

    const observable = this.productsService.addProduct(this.formData);
    observable.subscribe(
      () => {
        let observable = this.productsService.getProducts();

        observable.subscribe(
          (productsList) => {
            this.productsService.products = productsList;
          },
          (serverErrorResponse) => {
            this.error = serverErrorResponse.error.error;
          }
        );

        this.shopStateService.showAdd = false;
      },
      (serverErrorResponse) => {
        this.error = serverErrorResponse.error.error;
      }
    );
  }

  uploadFile(e: any) {
    this.file = e.target.files[0];
  }

  public updateProductFunc() {
    const category = this.categories.find(
      (category: CategoryModel) =>
        category.categoryName ===
        this.addProduct.value.categoryName.toLowerCase()
    ) as CategoryModel;

    this.formData.append(
      'id',
      this.shopStateService.productToUpdate.id.toString()
    );
    this.formData.append('productImage', this.file, this.file.name);

    this.formData.append('productName', this.addProduct.value.productName);
    this.formData.append('categoryId', category.id.toString());
    this.formData.append('price', this.addProduct.value.price);

    const observable = this.productsService.updateProduct(this.formData);
    observable.subscribe(
      () => {
        let observable = this.productsService.getProducts();

        observable.subscribe(
          (productsList) => {
            this.productsService.products = productsList;
          },
          (serverErrorResponse) => {
            this.error = serverErrorResponse.error.error;
          }
        );

        this.shopStateService.updateClicked = false;
      },
      (serverErrorResponse) => {
        this.error = serverErrorResponse.error.error;
      }
    );
  }
}
