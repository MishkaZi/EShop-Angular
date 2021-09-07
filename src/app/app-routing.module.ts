import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { Register2Component } from './components/register2/register2.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { CustomerGuard } from './guards/customer.guard';
import { ShopComponent } from './components/shop/shop.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'register', component: RegisterComponent, children: [
      { path: 'register2', component: Register2Component },
    ]
  },
  {
    path: 'shop', canActivate: [CustomerGuard], component: ShopComponent,
    children: [
      { path: 'order', canActivate: [CustomerGuard], component: OrderComponent }
    ]
  },

  { path: 'admin', canActivate: [AdminGuard], component: AdminComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '*', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
