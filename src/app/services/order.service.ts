import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 apiBaseUrl : string = "http://localhost:3000/orders"
 private readonly httpC = inject(HttpClient)

constructor() { }



postOrder(order: Order): Observable<void> {
  return this.httpC.post<void>(this.apiBaseUrl, order);
}
}
