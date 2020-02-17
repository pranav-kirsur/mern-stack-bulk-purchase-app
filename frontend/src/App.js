import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from "./components/users-list.component";
import CreateUser from "./components/create-user.component";
import LoginForm from "./components/login.component";
import Logout from "./components/logout.component";
import ProductAdditionForm from "./components/product-add.component"

function App() {

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

              <li className="navbar-item">
                <Link to="/addproduct" className="nav-link">
                  Add product
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
        <Route path="/displayusers" exact component={UsersList} />
        <Route path="/create" component={CreateUser} />
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <Route path="/addproduct" component={ProductAdditionForm} />
      </div>
    </Router>
  );
}

export default App;
