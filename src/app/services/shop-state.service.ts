import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class ShopStateService {
  public isLoggedIn: boolean = false;

  public productToUpdate: ProductModel;
  public updateClicked: boolean = false;
  public showAdd: boolean = false;

  public orderPressed: boolean = false;

  public cartShowHide: boolean = true;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('userFirstName')) {
      this.isLoggedIn = true;
    }
  }

  public getState(): Observable<any> {
    return this.http.get('https://morning-fjord-26804.herokuapp.com/shop');
  }
}
