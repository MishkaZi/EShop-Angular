import { Component, OnInit } from '@angular/core';
import { ShopStateService } from 'src/app/services/shop-state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    public shopStateService: ShopStateService,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {}
}
