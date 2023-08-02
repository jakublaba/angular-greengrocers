import {Component} from '@angular/core';
import {GroceryFilteringService} from "@services/grocery-filtering.service";
import {GroceryService} from "@services/grocery.service";
import {combineLatest, map} from "rxjs";
import {ItemTypeFilter} from "@models/item";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  private readonly groceries$ = this.groceryFilterService.filter(this.groceryService.groceries$);
  private readonly filterType$ = this.groceryFilterService.filterType$;
  readonly filterOptions = Object.values(ItemTypeFilter);
  observables$ = combineLatest([
    this.groceries$,
    this.filterType$
  ]).pipe(
    map(([groceries, filterType]) => ({groceries, filterType}))
  );

  constructor(
    private readonly groceryService: GroceryService,
    private readonly groceryFilterService: GroceryFilteringService
  ) {
  }

  setFilterType(e: Event) {
    const filter = (e.target as HTMLSelectElement).value as ItemTypeFilter;
    this.filterType$.next(filter);
  }
}
