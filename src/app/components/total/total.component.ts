import {Component, OnInit} from '@angular/core';
import {GroceryService} from "@services/grocery.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
  totalPrice$ = this.groceryService.totalPrice$;

  constructor(private readonly groceryService: GroceryService) {
  }

  ngOnInit(): void {
    this.totalPrice$.pipe(
      tap((price) => console.log(price))
    );
  }
}
