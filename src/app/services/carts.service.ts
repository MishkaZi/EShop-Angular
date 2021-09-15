import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartModel } from '../models/CartModel';
import { ProductModel } from '../models/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  public cart: CartModel;
  public total: number;
  public cartItems: ProductModel[];
  public searchInCartResults: string[];

  constructor(private http: HttpClient) {
    this.total = 0;
    this.cartItems = [];
    this.searchInCartResults = [];
  }

  // CART
  public getCart(): Observable<CartModel> {
    return this.http.get<CartModel>(
      'https://morning-fjord-26804.herokuapp.com/carts'
    );
  }

  public createCart(currentDate: Date): Observable<CartModel> {
    return this.http.post<CartModel>(
      'https://morning-fjord-26804.herokuapp.com/carts',
      { currentDate }
    );
  }

  // CART ITEMS
  public getCartItems(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      'https://morning-fjord-26804.herokuapp.com/carts/items'
    );
  }

  public addToCart(purchasedProduct: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(
      'https://morning-fjord-26804.herokuapp.com/carts/items',
      purchasedProduct
    );
  }

  public updateOnCart(productToUpdate: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(
      'https://morning-fjord-26804.herokuapp.com/carts/items',
      productToUpdate
    );
  }

  public removeFromCart(product: ProductModel): Observable<void> {
    return this.http.delete<void>(
      'https://morning-fjord-26804.herokuapp.com/carts/items/' + product.id
    );
  }

  public emptyCart(): Observable<void> {
    return this.http.delete<void>(
      'https://morning-fjord-26804.herokuapp.com/carts/items'
    );
  }
}
