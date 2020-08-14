import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatayugeService } from './services/datayuge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'datayuge-demo';
  searchResults: any = [];
  searchTerm: string = '';
  productdetais: any = [];
  filterData: any = [];
  Categories: any = [];
  isDisplayedTable: boolean = false;
  comparedState;

  constructor(public _service: DatayugeService) { }

  async ngOnInit() {
    let categoryLists = await this._service.categoryList();
    console.log("categoryLists By Categories", categoryLists);
  }

  async onSearch() {
    try {
      if (this.searchTerm) {
        let response = await this._service.searchItemsList(this.searchTerm)
        this.searchResults = response;
        this.Categories = [];
        this.filterData = response.meta.filters.map((filter) => {
          let keys = Object.keys(filter);
          this.Categories.push(keys[0])
          return filter[keys[0]];
        })
        console.log("FilterData", this.filterData, "Categories", this.Categories);

        this.comparedState = this.searchResults.data.map((search) => {
          return { data: [], isDisplayedTable: false }
        })
      }
    } catch (err) {
      console.log('Error ======> ', err);
    }
  }
  async productDetails(link, index) {

    if (this.comparedState[index].isDisplayedTable) {
      this.comparedState[index].isDisplayedTable = false;
      return;
    }
    this.comparedState[index].isDisplayedTable = true;
    if (this.comparedState[index].data.length) {
      return
    }
    console.log("Product Api link", link);
    try {
      const response = await this._service.productDetail(link)
      if (response) {
        this.isDisplayedTable = true;
      }

      this.comparedState[index].data = response['data'].stores.map((product: any, index) => {
        let keys = Object.keys(product);
        if (Object.keys(product[keys[0]]).length > 0) {
          return product[keys[0]];
        } else {
          return 0
        }
      })

      for (let i = 0; i < this.comparedState[index].data.length; i++) {
        if (this.comparedState[index].data[i] != 0) {
          this.productdetais.push(this.comparedState[index].data[i]);
        }
      }
      this.comparedState[index].data = this.productdetais;
      this.productdetais = [];

      console.log("Product Details Response", this.comparedState[index].data);

    } catch (err) {
      console.log('Error ======> ', err);
    }

  }
  async productListByCategories(filter, isCompare) {
    let productList = await this._service.productByCategories(filter, isCompare);
    this.searchResults = productList;
    console.log("ProductList By Categories", productList);
  }
}
