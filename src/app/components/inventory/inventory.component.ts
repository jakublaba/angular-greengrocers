import {Component} from '@angular/core';
import {GroceryFilteringService} from "../../service/grocery-filtering.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  isFilterEnabled$ = this.groceryService.isFilterEnabled$;
  filterType$ = this.groceryService.filterType$;
  groceries$ = this.groceryService.groceries$;

  constructor(private readonly groceryService: GroceryFilteringService) {
  }

  toggleIsFilterEnabled() {
    this.groceryService.toggleIsFilterEnabled();
  }

  toggleFilterType() {
    this.groceryService.toggleFilterType();
  }
}
