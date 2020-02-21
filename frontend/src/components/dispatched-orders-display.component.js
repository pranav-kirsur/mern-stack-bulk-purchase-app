import React, { Component } from "react";
import axios from "axios";

export default class DispatchedOrdersDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { refresh: false };
    this.dispatched_orders = [];
    this.render_orders = [];
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/api/product/getbystatus/dispatched/" +
          localStorage.getItem("UserID")
      )
      .then(response => {
        let orders = response.data;
        this.dispatched_orders = new Array(orders.length, []);
        for (let i in orders) {
          let order = orders[i];
          axios
            .get("http://localhost:4000/api/order/getbyproductid/" + order._id)
            .then(response => {
              this.dispatched_orders[i] = response.data;
            })
            .catch(function(error) {
              console.log(error);
            });
        }

        for (let i in this.dispatched_orders) {
          if (this.dispatched_orders[i].length > 0)
            this.render_orders = this.render_orders.concat(
              this.dispatched_orders[i]
            );
        }

        console.log(this.dispatched_orders);
        console.log("renders");
        console.log(this.render_orders);
        this.setState({ refresh: true });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Customer</th>
              <th>Rating</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {this.render_orders.map((currentProduct, i) => {
              return (
                <tr>
                  <td>{currentProduct.product_id.name}</td>
                  <td>{currentProduct.quantity}</td>
                  <td>{currentProduct.product_id.price}</td>
                  <td>{currentProduct.customer_id.username}</td>
                  <td>{currentProduct.rating}</td>
                  <td>{currentProduct.review}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
