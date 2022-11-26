import logo from './logo.svg';

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import './App.css';

import User from './components/user.component';
import AddUser from './components/add-user.component';
import UsersList from './components/users-list.component';
import Register from './components/editRegister.component';
import RegisterList from './components/register-list.component';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/Users"} className="navbar-brand">
            App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<UsersList/>} />
            <Route path="/users" element={<UsersList/>} />
            <Route path="/add" element={<AddUser/>} />
            <Route path="/users/:id" element={<User/>} />
            <Route path="/editRegister" element={<Register/>} />
            <Route path="/register-list" element={<RegisterList/>} />
          </Routes>
        </div>
      </div>
      </Router>
    )
  };
}

export default App;
