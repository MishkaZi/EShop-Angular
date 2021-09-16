import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from '../components/layout/layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/home/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AboutComponent } from '../components/home/about/about.component';
import { GeneralInfoComponent } from '../components/home/general-info/general-info.component';

import { AuthenticationInterceptor } from '../interceptors/authentication.interceptor';
import { Register2Component } from '../components/register2/register2.component';
import { AdminComponent } from '../components/admin/admin.component';
import { ShopComponent } from '../components/shop/shop.component';
import { CartComponent } from '../components/cart/cart.component';
import { OrderComponent } from '../components/order/order.component';
import { ProductListComponent } from '../components/shop/product-list/product-list.component';
import { ProductCardComponent } from '../components/shop/product-list/product-card/product-card.component';
import { CategoriesComponent } from '../components/shop/product-list/categories/categories.component';
import { AdminPanelComponent } from '../components/admin/admin-panel/admin-panel.component';
import { CartItemComponent } from '../components/cart/cart-item/cart-item.component';
import { ErrorComponent } from '../components/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    GeneralInfoComponent,
    Register2Component,
    AdminComponent,
    ShopComponent,
    CartComponent,
    OrderComponent,
    ProductListComponent,
    ProductCardComponent,
    CategoriesComponent,
    AdminPanelComponent,
    CartItemComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
     MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [LayoutComponent],
})
export class AppModule { }
