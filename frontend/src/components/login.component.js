import React, { Component } from "react";
import axios from "axios";
import jwt from "jwt-decode"


export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const User = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post("http://localhost:4000/api/user/login", User)
      .then((res) => {
        console.log(res);
        let decodedToken = jwt(res.data.token);
        localStorage.setItem("UserID",decodedToken.id)
        localStorage.setItem("UserType", decodedToken.type)
        localStorage.setItem("logged_in", "true")

        if(decodedToken.type === "vendor")
        {
          this.props.changeview("vendor")
        }
        if(decodedToken.type === "customer" )
        {
          this.props.changeview("customer")
        }
      })
      .catch((err) => {
        console.log(err.response);
      });

    this.setState({
      username: "",
      password: ""
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          
  
          <div className="form-group">
            <input
              type="submit"
              value="Login"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
