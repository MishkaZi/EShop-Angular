import { Component, OnInit } from '@angular/core';
import { ShopStateService } from 'src/app/services/shop-state.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(public shopStateService: ShopStateService) { }

  ngOnInit(): void {
  }

}
