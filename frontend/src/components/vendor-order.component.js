import React, { Component } from "react";
import axios from "axios";

export default class VendorOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { active: true };

    this.cancelOrderHandler = this.cancelOrderHandler.bind(this)
  }

  cancelOrderHandler() {
    let id = this.props.orderdata._id;
    //eslint-disable-next-line
    axios.get('http://localhost:4000/api/product/changestatusbyid/' + id + '/' + "cancelled")
    .then(response => {
       console.log(response.data)
    })
    .catch(function(error) {
        console.log(error);
    })

    this.setState({active: false});
  }

  render() {
    if (this.state.active) {
      let cancel_button = "";
      if (this.props.orderdata.status === "waiting") {
        cancel_button = (
          <td>
            <button
              className="btn btn-primary"
              onClick={this.cancelOrderHandler}
            >
              Cancel order
            </button>
          </td>
        );
      }

      return (
        <tr>
          <td>{this.props.orderdata.name}</td>
          <td>{this.props.orderdata.quantity}</td>
          <td>{this.props.orderdata.price}</td>
          {cancel_button}
        </tr>
      );
    }

    // don't render
    return null;
  }
}
