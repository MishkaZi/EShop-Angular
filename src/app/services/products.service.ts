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
      'http://localhost:3010/products'
    );
  }

  public getProductsByCategory(
    productsCategory?: number
  ): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      'http://localhost:3010/categories/' + productsCategory
    );
  }

  public addProduct(product:any) {
    return this.http.post<ProductModel>(
      'http://localhost:3010/products',
      product
    );
  }

  public updateProduct(product: any) {
    return this.http.put<ProductModel>(
      'http://localhost:3010/products',
      product
    );
  }

  searchProduct(searchInput: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      'http://localhost:3010/products/search/' + searchInput
    );
  }
}
