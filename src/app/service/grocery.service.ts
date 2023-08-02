import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, combineLatest, map, Observable} from "rxjs";
import Item, {ItemType} from "../models/item";
import {environment as env} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private readonly cartRefresh$ = new BehaviorSubject<Map<string, number>>(new Map());
  private _groceries: Map<string, Item> = new Map();
  private readonly _groceries$ = this.http.get<Item[]>(`${env.apiUrl}groceries`);
  private readonly _cart$ = this.cartRefresh$.asObservable();
  private readonly _isFilterEnabled$ = new BehaviorSubject(false);
  private readonly _filterType$ = new BehaviorSubject(ItemType.Vegetable);

  constructor(private readonly http: HttpClient) {
    this.groceries$.subscribe((groceries) => {
      this._groceries = groceries.reduce((groceries, item) => {
        groceries.set(item.id, item);
        return groceries;
      }, new Map<string, Item>());
    });
  }

  get groceries() {
    return this._groceries;
  }

  get groceries$() {
    return combineLatest([
      this._groceries$,
      this.isFilterEnabled$,
      this.filterType$
    ]).pipe(
      map(([groceries, isFilterEnabled, filter]) => {
        return isFilterEnabled ?
          groceries.filter(g => g.type === filter) :
          groceries;
      })
    )
  }

  get cart$() {
    return this._cart$;
  }

  get isFilterEnabled$() {
    return this._isFilterEnabled$;
  }

  get filterType$() {
    return this._filterType$;
  }

  get totalPrice$(): Observable<number> {
    return this.cart$.pipe(
      map((groceries) => Array.from(groceries.entries()).map(([id, amount]) => {
        const price = this.groceries.get(id)!.price;
        return price * amount;
      }).reduce((total, price) => total + price, 0))
    );
  }

  addToCart(itemId: string) {
    const cart = this.cartRefresh$.getValue();
    if (cart.has(itemId)) {
      const currentAmount = cart.get(itemId)!;
      cart.set(itemId, currentAmount + 1);
    } else {
      cart.set(itemId, 1);
    }
    this.cartRefresh$.next(cart);
  }

  removeFromCart(itemId: string) {
    const cart = this.cartRefresh$.getValue();
    if (!cart.has(itemId)) {
      throw new Error(`Cannot remove item ${itemId} from cart because it is not present`);
    }
    const currentAmount = cart.get(itemId)!;
    if (currentAmount > 1) {
      cart.set(itemId, currentAmount - 1);
    } else {
      cart.delete(itemId);
    }
    this.cartRefresh$.next(cart);
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
