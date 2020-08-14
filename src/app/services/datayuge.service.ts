import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatayugeService {

  readonly baseUrl: string = 'https://price-api.datayuge.com';
  readonly priceEndpoint: string = '/api/v1/compare'; // query param => api_key(required) , page (optional)
  // readonly apiKey: string = 'PSfhhULn3hgWxsU4hZgQHYUR2gL9kKkNr5y';
  readonly apiKey: string = "jeVxYjlKkL8DqYXVvI7J2C8hgyj4q0bMhuD";
  serach;
  constructor(public _http: HttpClient) { }

  categoryList() {
    return this._http.get<any>(`${this.baseUrl}${this.priceEndpoint}/list/categories?api_key=${this.apiKey}&page=10`
    )
      .toPromise();
  }
  searchItemsList(searchTerm) {
    this.serach = searchTerm;
    return this._http.get<any>(`${this.baseUrl}${this.priceEndpoint}/search?api_key=${this.apiKey}&product=${searchTerm.trim()}`
    )
      .toPromise();
  }
  productDetail(link) {
    return this._http
      .get(
        `${link}&api_key=${
        this.apiKey
        }`
      )
      .toPromise();
  }
  productByCategories(category, isCompare) {
    let can_compare = 0;
    if (isCompare) {
      can_compare = 1;
    }
    return this._http.get<any>(`${this.baseUrl}${this.priceEndpoint}/list?api_key=${this.apiKey}&product=${this.serach.trim()}&sub_category=${category}&can_compare=${can_compare}`
    )
      .toPromise();
    // "url": "https://price-api.datayuge.com/api/v1/compare/list?api_key=API_KEY&product=Iphone&sub_category=mobiles&can_compare=1&page=1&filter=200088-200485&sort=popularity",
    // return this._http
    // .get(
    //   `${link}&api_key=${
    //   this.apiKey
    //   }`
    // )
    // .toPromise();
  }

}
