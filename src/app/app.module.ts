import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GroceryInventory} from './components/grocery-inventory/grocery-inventory';
import {GroceryCart} from './components/grocery-cart/grocery-cart';
import {CartComponent} from './components/cart/cart.component';
import {InventoryListComponent} from './components/inventory-list/inventory-list.component';
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {TotalComponent} from './components/total/total.component';
import {InventoryComponent} from './components/inventory/inventory.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, GroceryInventory, GroceryCart, CartComponent, InventoryListComponent, TotalComponent, InventoryComponent],
  imports: [BrowserModule, NgOptimizedImage, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
