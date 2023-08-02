import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import Item from "@models/item";

export enum SortType {
  Name = 'name',
  Price = 'price'
}

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc'
}

@Injectable({
  providedIn: 'root'
})
export class GrocerySortingService {
  private readonly _isSortingEnabled$ = new BehaviorSubject(false);
  private readonly _sortType$ = new BehaviorSubject(SortType.Price);
  private readonly _sortDirection$ = new BehaviorSubject(SortDirection.Descending);

  get isSortingEnabled$() {
    return this._isSortingEnabled$;
  }

  get sortType$() {
    return this._sortType$;
  }

  get sortDirection$() {
    return this._sortDirection$;
  }

  sort(groceries: Observable<Item[]>): Observable<Item[]> {
    return combineLatest([
      groceries,
      this.isSortingEnabled$,
      this.sortType$,
      this.sortDirection$
    ]).pipe(
      map(([groceries, isSortingEnabled, sortType, sortDirection]) => {
        if (isSortingEnabled) {
          switch (sortType) {
            case SortType.Name: {
              return groceries.sort((a, b) => sortDirection === SortDirection.Ascending ?
                a.name.localeCompare(b.name) :
                b.name.localeCompare(a.name)
              );
            }
            case SortType.Price: {
              return groceries.sort((a, b) => sortDirection === SortDirection.Ascending ?
                a.price - b.price :
                b.price - a.price
              );
            }
          }
        } else {
          return groceries;
        }
      })
    );
  }

  toggleIsSortingEnabled() {
    this.isSortingEnabled$.next(!this.isSortingEnabled$.value);
  }

  toggleSortType() {
    const sortType = this.sortType$.value === SortType.Price ?
      SortType.Name :
      SortType.Price;
    this.sortType$.next(sortType);
  }

  toggleSortDirection() {
    const sortDirection = this.sortDirection$.value === SortDirection.Ascending ?
      SortDirection.Descending :
      SortDirection.Ascending;
    this.sortDirection$.next(sortDirection);
  }
}
