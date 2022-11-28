import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
//import './App.css';

import '../styles/nav.scss'
import User from '../components/user.component';
import AddUser from '../components/add-user.component';
import UsersList from '../components/users-list.component';
import Register from '../components/editRegister.component';
import RegisterList from '../components/register-list.component';
import LogIn from '../components/log-in.component';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from "bootstrap";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark">
          <div className='container-fluid'>
          <Link to={"/Users"} className="navbar-brand">
            Attendance Management Application
            <CalendarMonthIcon width="30" height="30" className="icons"></CalendarMonthIcon>
          </Link>

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Users"} className="nav-link">
                Search Student
                <PersonSearchIcon width="30" height="30" className="icons" style={{ color: "white" }}></PersonSearchIcon>

              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register-list"} className="nav-link">
                Search Register
                <ManageSearchIcon width="30" height="30" className="icons" style={{ color: "white" }}></ManageSearchIcon>

              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users/:id"} className="nav-link">
                Edit Student
                <ManageAccountsIcon width="30" height="30" className="icons" style={{ color: "white" }}></ManageAccountsIcon>

              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/editRegister"} className="nav-link">
                Edit Register
                <AppRegistrationIcon width="30" height="30" className="icons" style={{ color: "white" }}></AppRegistrationIcon>

              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add User
                <PersonAddIcon width="30" height="30" className="icons" style={{ color: "white" }}></PersonAddIcon>
              </Link>
            </li>
            
                
             
        
            <li className="nav-item">
              <Link to={"/login"} className="nav-link"data-bs-toggle="modal" data-bs-target="#exampleModal">
                Log Out
                <LogoutIcon className='d-inline-block align-text-top'style={{ color: "white" }}></LogoutIcon>
              </Link>
            </li>



            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header" style={{backgroundColor:"#CD4631", color:"white"}}>
                     <WarningAmberIcon></WarningAmberIcon>
                    <h5 class="modal-title" id="exampleModalLabel">   Sign Out Confirmation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Selecting confirm will return you to the Sign In screen where you will have to re-enter your details
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close<CloseIcon></CloseIcon></button>
                    <Link to={"/login"} className="nav-link">

                    <button type="button" class="btn btn-primary"data-bs-dismiss="modal">Confirm<DoneIcon></DoneIcon></button>
                    </Link>
                </div>
                </div>
            </div>
            </div>


          </div>
          </div>
        </nav>

    

        {/* <div className="container-sm">
        
        </div> */}
      </div>
    )
  };
}

export default Navbar;