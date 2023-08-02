import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, reduce, switchMap} from "rxjs";
import Item from "../models/item";
import {environment as env} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private readonly cartRefresh$ = new BehaviorSubject<Map<string, number>>(new Map());
  private _groceries: Map<string, Item> = new Map();
  private readonly cart$ = this.cartRefresh$.asObservable();

  constructor(private readonly http: HttpClient) {
    this.http.get<Item[]>(`${env.apiUrl}/groceries`).subscribe((groceries) => {
      this._groceries = groceries.reduce((groceries, item) => {
        groceries.set(item.id, item);
        console.log(groceries);
        return groceries;
      }, new Map<string, Item>());
    });
  }

  get groceries() {
    return this._groceries;
  }

  get totalPrice(): Observable<number> {
    return this.cart$.pipe(
      switchMap((cart) => {
        return [...cart.entries()].map(([id, amount]) => {
          const price = this.groceries.get(id)!.price;
          return price * amount;
        })
      }),
      reduce((total, price) => total + price, 0)
    );
  }

  addToCart(itemId: string, amount = 1) {
    const cart = this.cartRefresh$.getValue();
    if (cart.has(itemId)) {
      const currentAmount = cart.get(itemId)!;
      cart.set(itemId, currentAmount + amount);
    } else {
      cart.set(itemId, amount);
    }
    this.cartRefresh$.next(cart);
  }

  removeFromCart(itemId: string, amount = 1) {
    const cart = this.cartRefresh$.getValue();
    if (!cart.has(itemId)) {
      throw new Error(`Cannot remove item ${itemId} from cart because it is not present`);
    }
    const currentAmount = cart.get(itemId)!;
    if (amount > currentAmount) {
      throw new Error(`Cannot remove ${amount} items because there is ${currentAmount} in the cart`);
    }
    cart.set(itemId, currentAmount - amount);
    this.cartRefresh$.next(cart);
  }
}
