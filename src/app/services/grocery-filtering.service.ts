import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import Item, {ItemTypeFilter, toType} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class GroceryFilteringService {
  private readonly _filterType$ = new BehaviorSubject(ItemTypeFilter.All);

  filter(groceries: Observable<Item[]>): Observable<Item[]> {
    return combineLatest([
      groceries,
      this.filterType$
    ]).pipe(
      map(([groceries, filterType]) =>
        filterType === ItemTypeFilter.All ?
          groceries :
          groceries.filter(g => g.type === toType(filterType))
      )
    );
  }

  get filterType$() {
    return this._filterType$;
  }

  setFilterType(filter: ItemTypeFilter) {
    this.filterType$.next(filter);
  }
}
