import {Component} from '@angular/core';
import {GroceryService} from "../../service/grocery.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  isFilterEnabled$ = this.groceryService.isFilterEnabled$;
  filterType$ = this.groceryService.filterType$;
  groceries$ = this.groceryService.groceries$;

  constructor(private readonly groceryService: GroceryService) {
  }

  toggleIsFilterEnabled() {
    this.groceryService.toggleIsFilterEnabled();
  }

  toggleFilterType() {
    this.groceryService.toggleFilterType();
  }
}
