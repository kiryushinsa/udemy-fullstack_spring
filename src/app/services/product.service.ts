import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  private baseUrl =  'http://localhost:8080/api/products'; //by default set of notes = 20, if you want change it need to set ?size=num
  private categoryUrl ='http://localhost:8080/api/product-category';
  //injecr Httpclient
  constructor(private httpClient: HttpClient) { }



  getProductList(theCategoryId: number): Observable <Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`; //
    
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products) // _embedded get from response in spring 
    );
  }



  getProductCategories(): Observable<ProductCategory[]> {
    
    return this.httpClient.get<GetResponseProductsCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory) // _embedded get from response in spring 
    );
  }
 

}

interface GetResponseProducts{
  //hepled to unwraps the Json from Spring Data Rest _embedded entry 
  // array of products
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductsCategory{
  //hepled to unwraps the Json from Spring Data Rest _embedded entry 
  // array of products
  _embedded: {
    productCategory: ProductCategory[];
  }
}