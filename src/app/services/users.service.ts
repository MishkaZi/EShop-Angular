import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isAdmin: boolean = false;
  constructor(private http: HttpClient) {}

  public login(
    userModel: UserModel
  ): Observable<SuccessfulLoginServerResponse> {
    //  The http request will be sent after the subscribe() method will be called
    return this.http.post<SuccessfulLoginServerResponse>(
      'http://localhost:3001/users/login',
      userModel
    );
    // return this.http.post<SuccessfulLoginServerResponse>("/api/login",UserModel);
  }
}
