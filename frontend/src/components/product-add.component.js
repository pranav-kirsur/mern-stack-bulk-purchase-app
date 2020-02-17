import React, { Component } from "react";
import axios from "axios";

export default class ProductAddComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      quantity: ""
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeName(event) {
    this.setState({ name: event.target.value });
  }

  onChangePrice(event) {
    this.setState({ price: event.target.value });
  }

  onChangeQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newProduct = {
      name: this.state.name,
      price: this.state.price,
      quantity: this.state.quantity,
      vendor_id: localStorage.getItem("userID")
    };

    axios
      .post("http://localhost:4000/api/product/add", newProduct)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        let errors = err.response.data
        console.log(err.response);
        this.setState(errors);
      });


  }

  render() {
    if (
      localStorage.getItem("logged_in") === "true" &&
      localStorage.getItem("UserType") === "vendor"
    ) {
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="form-group">
              <label>Quantity: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
              />
            </div>

            <div className="form-group">
              <label>Price: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.price}
                onChange={this.onChangePrice}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Create Product"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      );
    } else {
        return <h1>Need to be logged in as a vendor!</h1>
    }
  }
}
