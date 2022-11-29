import logo from './logo.svg';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
//import './App.css';

import './styles/nav.scss'
import User from './components/user.component';
import AddUser from './components/add-user.component';
import UsersList from './components/users-list.component';
import Register from './components/register.component';
import RegisterList from './components/register-list.component';
import LogIn from './components/log-in.component';
import AddUserExternal from './components/create-user-external.component';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Navbar from './components/navbar.component';
import AcademicAdvisor from './components/academicadvisor.component';


class App extends Component {
  render() {
    return (
      <div>

      <Router>


      <Routes>
      <Route path="/" element={<LogIn/>} />

        <Route path="/login" element={<LogIn/>} />
        <Route path="createUser" element={<AddUserExternal/>}/>
        <Route path="/Navbar" element={<Navbar/>}/>
        <Route path="/users" element={<UsersList/>} />
        <Route path="/add" element={<AddUser/>} />
        <Route path="/users/:id" element={<User/>} />
        <Route path="/register/:id" element={<Register/>} />
        <Route path="/register-list" element={<RegisterList/>} />
        <Route path="/advisor" element={<AcademicAdvisor/>} />
      </Routes>
    </Router>
    </div>
    )
  };
}

export default App;
