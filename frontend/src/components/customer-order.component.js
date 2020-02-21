import React, { Component } from "react";
import axios from "axios";
// import { Redirect } from "react-router-dom";
const validator = require("validator");
const isPos = require("is-positive-integer");

export default class CustomerOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { active: true };

    this.editOrderHandler = this.editOrderHandler.bind(this);
    this.reviewHandler = this.reviewHandler.bind(this);
  }

  reviewHandler() {
    let id = this.props.orderdata._id;
    let review = prompt("Enter review for the product");
    if (review === null) {
      review = "";
    }

    let rating = prompt("Enter a rating for the product");
    if (rating === null) {
      alert("Enter a rating for the product");
      return;
    }

    if (!validator.isNumeric(rating)) {
      alert("Rating must be a number from 1 to 5");
      return;
    }
    rating = Number(rating);
    if (!isPos(rating)) {
      alert("Rating must be a number from 1 to 5");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Rating must be a number from 1 to 5");
      return;
    }

    let Review = {
        order_id: id,
        rating: rating,
        review: review
    }

    axios
    .post("http://localhost:4000/api/order/addReview/", Review)
    .then(response => {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });


  }

  editOrderHandler() {
    let id = this.props.orderdata._id;

    let quantity = prompt("Enter the new quantity in order");
    if (quantity === null) {
      alert("Enter a quantity");
      return;
    }
    if (!validator.isNumeric(quantity)) {
      alert("Quantity must be a number");
      return;
    }
    quantity = Number(quantity);
    if (!isPos(quantity)) {
      alert("Quantity must be a positive integer");
    }
    if (
      quantity >
      this.props.orderdata.product_id.quantity -
        (this.props.orderdata.product_id.quantityOrdered -
          this.props.orderdata.quantity)
    ) {
      alert("Not enough stock");
      return;
    }

    let Order = {
      order_id: id,
      quantity: quantity,
      product_id: this.props.orderdata.product_id._id
    };

    axios
      .post("http://localhost:4000/api/order/editOrder/", Order)
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    let edit_order_button = <td></td>;
    let quantity_left = <td></td>;
    let review_order_button = <td></td>;
    if (this.props.orderdata.product_id.status === "waiting") {
      quantity_left = (
        <td>
          {this.props.orderdata.product_id.quantity -
            this.props.orderdata.product_id.quantityOrdered}
        </td>
      );
    }

    if (this.props.orderdata.product_id.status === "waiting") {
      edit_order_button = (
        <td>
          <button onClick={this.editOrderHandler} class="btn btn-primary">
            Edit Order
          </button>
        </td>
      );
    }

    if (this.props.orderdata.product_id.status === "dispatched") {
      review_order_button = (
        <td>
          <button onClick={this.reviewHandler} class="btn btn-primary">
            Review Order
          </button>
        </td>
      );
    }

    return (
      <tr>
        <td>{this.props.orderdata.product_id.vendor_id.username}</td>
        <td>{this.props.orderdata.product_id.name}</td>
        <td>{this.props.orderdata.quantity}</td>
        <td>{this.props.orderdata.product_id.price}</td>
        <td>{this.props.orderdata.product_id.status}</td>
        {quantity_left}
        {edit_order_button}
        {review_order_button}
      </tr>
    );
  }
}
