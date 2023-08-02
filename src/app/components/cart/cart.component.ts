import {Component} from '@angular/core';
import {GroceryService} from "@services/grocery.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart$ = this.groceryService.cart$;

  constructor(private readonly groceryService: GroceryService) {
  }
}
