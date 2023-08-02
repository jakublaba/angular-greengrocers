import {Component, Input, OnInit} from '@angular/core';
import {GroceryService} from "@services/grocery.service";

@Component({
  selector: 'app-grocery-inventory',
  templateUrl: './grocery-inventory.html',
  styleUrls: ['./grocery-inventory.css']
})
export class GroceryInventory implements OnInit {
  @Input() itemId?: string;
  iconPath?: string;

  constructor(private readonly groceryService: GroceryService) {
  }

  onClick() {
    this.groceryService.addToCart(this.itemId!);
  }

  ngOnInit(): void {
    this.iconPath = `assets/icons/${this.itemId}.svg`;
  }
}
