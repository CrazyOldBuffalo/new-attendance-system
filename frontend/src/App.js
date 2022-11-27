import logo from './logo.svg';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
//import './App.css';

import './styles/nav.scss'
import User from './components/user.component';
import AddUser from './components/add-user.component';
import UsersList from './components/users-list.component';
import Register from './components/editRegister.component';
import RegisterList from './components/register-list.component';
import LogIn from './components/log-in.component';
import LogoutIcon from '@mui/icons-material/Logout';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark">
          <div className='container-fluid'>
          <Link to={"/Users"} className="navbar-brand">
            Attendance Management Application
            <img src='https://www.halepuna.com/wp-content/uploads/2021/02/ic_cal.png'alt="log" width="30" height="30" className="d-inline-block align-text-top"></img>

          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Users"} className="nav-link">
                Search Student
                <img src='https://www.citypng.com/public/uploads/small/116400840186bmo0mkghcdq8hn99wmpbh9wrgbytghidisi7e41vegbclccrb6kg9hrk0ebgqrpc5ezz2tjtkvsfsvk7yfbakowxbpvrzsakde3.png'alt="log" width="30" height="30" className="d-inline-block align-text-top"></img>

              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add User
                <img src='https://giftcards.woolworths.com.au/_ui/responsive/common/images/User_icon_white.png'alt="log" width="30" height="30" className="d-inline-block align-text-top"></img>

              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log Out
                <LogoutIcon className='d-inline-block align-text-top'></LogoutIcon>
              </Link>
            </li>

          </div>
          </div>
        </nav>

    

        <div className="container-sm">
          <Routes>
            <Route path="/" element={<UsersList/>} />
            <Route path="/users" element={<UsersList/>} />
            <Route path="/add" element={<AddUser/>} />
            <Route path="/users/:id" element={<User/>} />
            <Route path="/editRegister" element={<Register/>} />
            <Route path="/register-list" element={<RegisterList/>} />
            <Route path="/login" element={<LogIn/>} />
          </Routes>
        </div>
      </div>
      </Router>
    )
  };
}

export default App;
