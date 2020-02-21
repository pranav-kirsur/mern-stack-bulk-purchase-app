import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from "./components/users-list.component";
import CreateUser from "./components/create-user.component";
import LoginForm from "./components/login.component";
import Logout from "./components/logout.component";
import ProductAdditionForm from "./components/product-add.component";
import VendorOrderDisplay from "./components/vendor-order-display.component";
import ListingDisplayCustomer from "./components/listing-display-customer";
import OrdersDisplayCustomer from "./components/customer-orders-display.component"
import DispatchedOrdersDisplay from "./components/dispatched-orders-display.component"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "default"
    };
  }

  changeView(view_to_set) {
    this.setState({
      view: view_to_set
    });
  }

  componentDidMount() {
    if (localStorage.getItem("logged_in") === "true") {
      this.setState({ view: localStorage.getItem("UserType") });
    }
  }

  render() {
    if (this.state.view === "default") {
      return (
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">
                App
              </Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/displayusers" className="nav-link">
                      Display Users
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <br />
            <Route path="/displayusers" exact component={UsersList} />
            <Route path="/create" component={CreateUser} />
            <Route
              path="/login"
              render={props => (
                <LoginForm {...props} changeview={this.changeView.bind(this)} />
              )}
            />
          </div>
        </Router>
      );
    }
    if (this.state.view === "vendor") {
      return (
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">
                Vendor Dashboard
              </Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/addproduct" className="nav-link">
                      Add product
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link to="/waitingorders" className="nav-link">
                      Waiting orders
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link to="/placedorders" className="nav-link">
                      Placed orders
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link to="/cancelledorders" className="nav-link">
                      Cancelled orders
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link to="/logout" className="nav-link">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <br />

            <Route
              path="/logout"
              render={props => (
                <Logout {...props} changeview={this.changeView.bind(this)} />
              )}
            />

            <Route
              path="/waitingorders"
              render={props => (
                <VendorOrderDisplay {...props} status={"waiting"} />
              )}
            />

            <Route
              path="/placedorders"
              render={props => (
                <VendorOrderDisplay {...props} status={"placed"} />
              )}
            />

            <Route
              path="/cancelledorders"
              render={props => (
                <VendorOrderDisplay {...props} status={"cancelled"} />
              )}
            />
            <Route path="/addproduct" component={ProductAdditionForm} />
          </div>
        </Router>
      );
    }

    if (this.state.view === "customer") {
      return (
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">
                Customer Dashboard
              </Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/listingsdisplay" className="nav-link">
                      View listings
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link to="/ordersdisplay" className="nav-link">
                      Display Orders
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link to="/logout" className="nav-link">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <br />

            <Route
              path="/logout"
              render={props => (
                <Logout {...props} changeview={this.changeView.bind(this)} />
              )}
            />

            <Route
              path="/listingsdisplay"
              render={props => <ListingDisplayCustomer {...props} />}
            />

            <Route
              path="/ordersdisplay"
              render={props => <OrdersDisplayCustomer {...props} />}
            />
          </div>
        </Router>
      );
    }
  }
}

export default App;
