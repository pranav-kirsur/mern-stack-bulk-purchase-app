import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom";

import ProductListingCustomer from "./product-listing-customer.component";

export default class ListingDisplayCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = { listings: [], productname: "", sorttype: "price" };

    this.onChangeProductname = this.onChangeProductname.bind(this);
    this.onChangeSortType = this.onChangeSortType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state.orderpage = false;
    this.displayOrderPage = this.displayOrderPage.bind(this)
  }

  onChangeProductname(event) {
    this.setState({ productname: event.target.value });
  }

  onChangeSortType(event) {
    this.setState({ sorttype: event.target.value });
  }

  displayOrderPage()
  {
    this.setState({orderpage : true});

  }

  onSubmit(e) {
    e.preventDefault();

    axios
      .get("http://localhost:4000/api/product/getall")
      .then(response => {
        this.setState({ listings: JSON.parse(JSON.stringify(response.data)) });
        let productname = this.state.productname;
        let products_to_display = this.state.listings.filter(function(prod) {
          return prod.status === "waiting" && prod.name === productname;
        });
        if (this.state.sorttype === "price") {
          products_to_display = products_to_display.sort(function(a, b) {
            return a.price - b.price;
          });
        }
        if (this.state.sorttype === "quantity") {
          products_to_display = products_to_display.sort(function(a, b) {
            let a_quant = a.quantity - a.quantityOrdered;
            let b_quant = b.quantity - b.quantityOrdered;
            return a_quant - b_quant;
          });
        }

        console.log(products_to_display);
        let listings = (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Vendor Name</th>
                <th>Price</th>
                <th>Quantity left</th>
              </tr>
            </thead>
            <tbody>
              {products_to_display.map((currentProduct, i) => {
                return <ProductListingCustomer orderdata={currentProduct} displayOrderPage={this.displayOrderPage} />;
              })}
            </tbody>
          </table>
        );
        ReactDOM.render(listings, document.getElementById("listings"));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    if(this.state.orderpage)
    {
      return <Redirect to = "/" />;
    }

    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Search product: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.productname}
                onChange={this.onChangeProductname}
              />
            </div>

            <div className="form-group">
              <label>Sort by: </label>
              <select
                className="form-control"
                value={this.state.sorttype}
                onChange={this.onChangeSortType}
              >
                <option value="price">Price</option>
                <option value="quantity">
                  Quantity of items left in bundle
                </option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Get listings"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>

        <div id="listings"></div>
      </div>
    );
  }
}
