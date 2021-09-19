import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirstStepRegisterModel } from '../models/FirstStepRegisterModel';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public isAdmin: boolean = false;
  public userFirstName: string;
  public userDetails: UserModel;
  public cities: string[];

  public firstStepRegisterCompleted: boolean;
  public firstStageUserDetails: FirstStepRegisterModel;

  constructor(private http: HttpClient) {
    this.userDetails = new UserModel();

    //Israely cities by population
    this.cities = [
      'Jerusalem',
      'Tel Aviv',
      'Haifa',
      'Ashdod',
      'Rishon LeZiyyon',
      'Petah Tikva',
      'BeerSheba',
      'Netanya',
      'Holon',
      'Bnei Brak',
    ].sort((a, b) => (a == b ? 0 : a < b ? -1 : 1));

    this.userDetails.city = this.cities[0];
    this.firstStepRegisterCompleted = false;
  }

  public login(
    userDetails: UserModel,
    id: number
  ): Observable<SuccessfulLoginServerResponse> {
    const loginDetails = id ? { id } : userDetails;

    //Change to /users
    return this.http.post<SuccessfulLoginServerResponse>(
      'https://morning-fjord-26804.herokuapp.com/users',
      loginDetails
    );
  }

  public logout(token: string): Observable<void> {
    return this.http.post<void>(
      'https://morning-fjord-26804.herokuapp.com/users/logout',
      {
        token,
      }
    );
  }

  public firstStepRegister(firstStepUserDetails: UserModel): Observable<void> {
    return this.http.post<void>(
      'https://morning-fjord-26804.herokuapp.com/users/register',
      firstStepUserDetails
    );
  }

  public register(secondStepUserDetails: UserModel): Observable<void> {
    return this.http.post<void>(
      'https://morning-fjord-26804.herokuapp.com/users/register2',
      secondStepUserDetails
    );
  }

  public getUserDetails() {
    return this.http.get('https://morning-fjord-26804.herokuapp.com/users/');
  }
}
