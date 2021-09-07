import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class ShopStateService {
  public isLoggedIn: boolean;

  public productToUpdate: ProductModel;
  public updateClicked: boolean = false;

  constructor(private http: HttpClient) {
    this.isLoggedIn = false;
    if (localStorage.getItem('userFirstName')) {
      this.isLoggedIn = true;
    }
  }

  public getState(): Observable<any> {
    return this.http.get('http://localhost:3001/shop');
  }
}
