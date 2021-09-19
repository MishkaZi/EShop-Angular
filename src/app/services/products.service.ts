import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductModel } from '../models/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: ProductModel[] = [];
  public productsCategory: number;
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      'https://morning-fjord-26804.herokuapp.com/products'
    );
  }

  public getProductsByCategory(
    productsCategory?: number
  ): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      'https://morning-fjord-26804.herokuapp.com/categories/' + productsCategory
    );
  }

  public addProduct(product: any) {
    return this.http.post<ProductModel>(
      'https://morning-fjord-26804.herokuapp.com/products',
      product
    );
  }

  public updateProduct(product: any) {
    return this.http.put<ProductModel>(
      'https://morning-fjord-26804.herokuapp.com/products',
      product
    );
  }

  searchProduct(searchInput: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      'https://morning-fjord-26804.herokuapp.com/products/search/' + searchInput
    );
  }
}
