import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  public amount: string = "0";
  constructor(public productService: ProductsService, public cartService: CartsService) { }

  ngOnInit(): void {
  }


  defaultInitilized() {
    this.amount = "0";
  }

  addToCart() {
    // if (this.amount >= "1") {
    //   const { id, price, productName, image } = this.productService.productShowModal
    //   const cartProduct = new CartProductPost(id, this.amount, price, this.cartService.userCartId.id);
    //   const productFront: CartProductFront = new CartProductFront(id, productName, this.amount, price * Number(this.amount), image, this.cartService.userCartId.id)
    //   const observable = this.cartService.postProductToCart(cartProduct);
    //   observable.subscribe((HttpResultData) => {
    //     console.log(HttpResultData)
    //     this.cartService.cartProductFront.push(productFront);
    //     this.cartService.cartPriceTotal += productFront.price;
    //   }, (HttpResultError) => {
    //     console.log(HttpResultError)
    //   })
    // }

    this.defaultInitilized()
  }

}
