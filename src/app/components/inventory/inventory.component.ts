import {Component} from '@angular/core';
import {ItemType} from "../../models/item";
import {GroceryService} from "../../service/grocery.service";
import {BehaviorSubject, combineLatest, map} from "rxjs";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  isFilterEnabled$ = new BehaviorSubject(false);
  filter$ = new BehaviorSubject<ItemType>(ItemType.Vegetable);
  groceries$ = combineLatest([
    this.groceryService.groceries$,
    this.isFilterEnabled$,
    this.filter$
  ]).pipe(
    map(([groceries, isFilterEnabled, filter]) => {
      return isFilterEnabled ?
        groceries.filter(g => g.type === filter) :
        groceries;
    })
  );

  constructor(private readonly groceryService: GroceryService) {
  }

  toggleIsFilterEnabled() {
    this.isFilterEnabled$.next(!this.isFilterEnabled$.value);
  }

  toggleFilterType() {
    let filter: ItemType;
    switch (this.filter$.value) {
      case ItemType.Fruit: {
        filter = ItemType.Vegetable;
        break;
      }
      case ItemType.Vegetable: {
        filter = ItemType.Fruit;
        break;
      }
    }
    this.filter$.next(filter);
  }
}
