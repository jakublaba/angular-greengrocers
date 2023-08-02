import {Component} from '@angular/core';
import {GroceryService} from "../../service/grocery.service";
import {ItemType} from "../../models/item";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  groceries$ = this.groceryService.groceries$;
  private isFilterEnabled = false;
  private filter = ItemType.Vegetable; // some default value to avoid undefined

  constructor(private readonly groceryService: GroceryService) {
  }

  toggleIsFilterEnabled() {
    this.isFilterEnabled = !this.isFilterEnabled;
  }

  toggleFilterType() {
    switch (this.filter) {
      case ItemType.Fruit: {
        this.filter = ItemType.Vegetable;
        break;
      }
      case ItemType.Vegetable: {
        this.filter = ItemType.Fruit;
        break;
      }
    }
  }
}
