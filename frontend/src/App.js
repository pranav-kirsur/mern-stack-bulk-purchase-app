import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from "./components/users-list.component";
import CreateUser from "./components/create-user.component";
import LoginForm from "./components/login.component";

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
            </ul>
          </div>
        </nav>

        <br />
        <Route path="/displayusers" exact component={UsersList} />
        <Route path="/create" component={CreateUser} />
        <Route path="/login" component={LoginForm} />
      </div>
    </Router>
  );
}

export default App;
