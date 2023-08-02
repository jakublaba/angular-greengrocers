import {Component} from '@angular/core';
import {GroceryService} from "../../service/grocery.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  groceries$ = this.groceryService.groceries$;

  constructor(private readonly groceryService: GroceryService) {
  }
}
