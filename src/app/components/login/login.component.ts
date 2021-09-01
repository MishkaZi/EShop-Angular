import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserModel } from '../../models/UserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userModel: UserModel = new UserModel(0, '');

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    let loginObservable = this.usersService.login(this.userModel);
    loginObservable.subscribe(
      (successfulServerRequestData) => {
        console.log(successfulServerRequestData);
        this.usersService.isAdmin = successfulServerRequestData.isAdmin;
        sessionStorage.setItem(
          'token',
          'Bearer ' + successfulServerRequestData.token + ''
        );
        if (successfulServerRequestData.isAdmin) {
          this.router.navigate(['/admin']);
          return;
        }
        this.router.navigate(['/home']);
      },
      (serverErrorResponse) => {
        // Reaching here means that the server had failed
        // serverErrorResponse is the object returned from the ExceptionsHandler
        alert(
          'Error! Status: ' +
            serverErrorResponse.status +
            ', Message: ' +
            serverErrorResponse.message
        );
      }
    );
  }
}
