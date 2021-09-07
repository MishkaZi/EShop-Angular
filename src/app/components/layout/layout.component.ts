import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userId') === '12345678') {
      this.usersService.isAdmin = true;
    }
    else if (localStorage.getItem('userId') !== '12345678') {
      this.usersService.isAdmin = false;
    }
  }

}
