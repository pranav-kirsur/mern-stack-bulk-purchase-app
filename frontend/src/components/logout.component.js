import React, { Component } from "react";

export default class Logout extends Component {

  render() {
      localStorage.removeItem("UserID");
      localStorage.removeItem("UserType");
      localStorage.removeItem("logged_in");
      this.props.changeview("default");
      return <h1>Succesful logout</h1>
  }

}
