import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryModel } from '../models/CategoryModel';
import { ProductModel } from '../models/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public categories: CategoryModel[];
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(
      'https://morning-fjord-26804.herokuapp.com/categories'
    );
  }
}
