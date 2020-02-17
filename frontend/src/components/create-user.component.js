import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passwordConfirm: "",
      type: "vendor"
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangePasswordConfirm(event) {
    this.setState({ passwordConfirm: event.target.value });
  }

  onChangeType(event) {
    this.setState({ type: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      type: this.state.type
    };

    axios
      .post("http://localhost:4000/api/user/register", newUser)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        let errors = err.response.data
        console.log(err.response);
        this.setState(errors);
        
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
            <label>Confirm Password: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.passwordConfirm}
              onChange={this.onChangePasswordConfirm}
            />
          </div>
          <div className="form-group">
            <label>Type of user: </label>
            <select
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
            >
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
