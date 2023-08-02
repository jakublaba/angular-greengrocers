import {Injectable} from "@angular/core";
import {GroceryService} from "./grocery.service";
import {BehaviorSubject, combineLatest, map} from "rxjs";
import {ItemType} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class GroceryFilteringService {
  private readonly _isFilterEnabled$ = new BehaviorSubject(false);
  private readonly _filterType$ = new BehaviorSubject(ItemType.Vegetable);

  constructor(private readonly groceryService: GroceryService) {
  }

  get groceries$() {
    return combineLatest([
      this.groceryService.groceries$,
      this.isFilterEnabled$,
      this.filterType$
    ]).pipe(
      map(([groceries, isFilterEnabled, filterType]) =>
        isFilterEnabled ?
          groceries.filter(g => g.type === filterType)
          : groceries
      )
    );
  }

  get isFilterEnabled$() {
    return this._isFilterEnabled$;
  }

  get filterType$() {
    return this._filterType$;
  }

  toggleIsFilterEnabled() {
    this.isFilterEnabled$.next(!this.isFilterEnabled$.value);
  }

  toggleFilterType() {
    let filter: ItemType;
    switch (this.filterType$.value) {
      case ItemType.Fruit: {
        filter = ItemType.Vegetable;
        break;
      }
      case ItemType.Vegetable: {
        filter = ItemType.Fruit;
        break;
      }
    }
    this.filterType$.next(filter);
  }
}
