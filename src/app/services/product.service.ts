import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiBaseUrl : string = "http://localhost:3000/products"
  constructor(){}
  private readonly httpC = inject(HttpClient)

     getAllProducts(): Observable<Product[]>{

      return this.httpC.get<Product[]>(this.apiBaseUrl)
     }
}
