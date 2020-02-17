import React, { Component } from "react";

export default class Logout extends Component {


  render() {
      localStorage.removeItem("UserID")
      localStorage.removeItem("UserType")
      localStorage.removeItem("logged_in")
      return <h1>Succesful logout</h1>
  }

}
