import React, { Component } from "react";
import axios from "axios";
const validator = require("validator");
const isPos = require("is-positive-integer")


export default class ProductListingCustomer extends Component {
  constructor(props) {
    super(props);

    this.placeOrderHandler = this.placeOrderHandler.bind(this);
  }

  placeOrderHandler() {
    let Order = {
        product_id : this.props.orderdata._id,
        customer_id: localStorage.getItem("UserID")
    };

    let quantity = prompt("Enter the quantity to order");
    if(!validator.isNumeric(quantity))
    {
        alert("Quantity must be a number");
        return;
    }
    quantity = Number(quantity);
    if(!isPos(quantity))
    {
        alert("Quantity must be a positive integer")
    }
    if(quantity >(this.props.orderdata.quantity - this.props.orderdata.quantityOrdered))
    {
        alert("Not enough stock");
        return;
    }
    Order.quantity = quantity;



    axios
      .post("http://localhost:4000/api/order/placeOrder/", Order)
      .then(response => {
        console.log(response.data);
        this.props.displayOrderPage();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.orderdata.name}</td>
        <td>{this.props.orderdata.vendor_id.username}</td>
        <td>{this.props.orderdata.price}</td>
        <td>{this.props.orderdata.quantity - this.props.orderdata.quantityOrdered}</td>
        <td>
          <button className="btn btn-primary" onClick = {this.placeOrderHandler}>Place Order</button>
        </td>
      </tr>
    );
  }
}
