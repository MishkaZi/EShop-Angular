import { Injectable } from '@angular/core';
import { CartModel } from '../models/CartModel';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  public cartProducts: CartModel[];

  constructor() { }
}
