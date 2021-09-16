import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { OrderDetailsModel } from '../models/OrderDetailsModel';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) { }

  public order(
    orderDetails: OrderDetailsModel
  ): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>(
      'https://morning-fjord-26804.herokuapp.com/orders/',
      orderDetails
    );
  }

  public getShippingDates(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://morning-fjord-26804.herokuapp.com/orders'
    );
  }
}
