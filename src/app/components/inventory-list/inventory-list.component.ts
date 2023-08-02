import {Component, Input} from '@angular/core';
import {GroceryService} from "@services/grocery.service";
import Item from "@models/item";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent {
  @Input() groceries: Item[] | null = null;

  constructor(private readonly groceryService: GroceryService) {
  }
}
