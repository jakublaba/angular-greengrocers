import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GroceryInventory} from './components/grocery-inventory/grocery-inventory';
import {GroceryCart} from './components/grocery-cart/grocery-cart';
import {CartComponent} from './components/cart/cart.component';
import {InventoryComponent} from './components/inventory/inventory.component';
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, GroceryInventory, GroceryCart, CartComponent, InventoryComponent],
  imports: [BrowserModule, NgOptimizedImage, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
