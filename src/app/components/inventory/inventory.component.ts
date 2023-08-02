import {Component} from '@angular/core';
import {GroceryFilteringService} from "@services/grocery-filtering.service";
import {GroceryService} from "@services/grocery.service";
import {combineLatest, map} from "rxjs";
import {ItemTypeFilter} from "@models/item";
import {GrocerySortingService, SortDirection} from "@services/grocery-sorting.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  private readonly groceries$ = this.grocerySortingService.sort(
    this.groceryFilterService.filter(this.groceryService.groceries$)
  );
  private readonly filterType$ = this.groceryFilterService.filterType$;
  readonly filterOptions = Object.values(ItemTypeFilter);
  observables$ = combineLatest([
    this.groceries$,
    this.filterType$,
    this.grocerySortingService.isSortingEnabled$,
    this.grocerySortingService.sortType$,
    this.grocerySortingService.sortDirection$
  ]).pipe(
    map(([
           groceries,
           filterType,
           isSortingEnabled,
           sortType,
           sortDirection]) =>
      ({
        groceries,
        filterType,
        isSortingEnabled,
        sortType,
        sortDirection
      })
    )
  );

  constructor(
    private readonly groceryService: GroceryService,
    private readonly groceryFilterService: GroceryFilteringService,
    private readonly grocerySortingService: GrocerySortingService
  ) {
  }

  setFilterType(e: Event) {
    const filter = (e.target as HTMLSelectElement).value as ItemTypeFilter;
    this.filterType$.next(filter);
  }

  toggleIsSortingEnabled() {
    this.grocerySortingService.toggleIsSortingEnabled();
  }

  toggleSortType() {
    this.grocerySortingService.toggleSortType();
  }

  toggleSortDirection() {
    this.grocerySortingService.toggleSortDirection();
  }

  protected readonly SortDirection = SortDirection;
}
