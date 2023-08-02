import {Component, Input, OnInit} from '@angular/core';
import {GroceryService} from "@services/grocery.service";

@Component({
  selector: 'app-grocery-cart',
  templateUrl: './grocery-cart.html',
  styleUrls: ['./grocery-cart.css']
})
export class GroceryCart implements OnInit {
  @Input() itemId?: string;
  @Input() amount?: number;
  iconPath?: string;
  itemName?: string;

  constructor(private readonly groceryService: GroceryService) {
  }

  addToCart() {
    this.groceryService.addToCart(this.itemId!);
  }

  removeFromCart() {
    this.groceryService.removeFromCart(this.itemId!);
  }

  ngOnInit(): void {
    this.iconPath = `assets/icons/${this.itemId}.svg`;
    this.itemName = this.itemId!.substring(4);
  }
}
