import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link} from 'react-router-dom';
//import './App.css';

import '../styles/nav.scss'
import LogoutIcon from '@mui/icons-material/Logout';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

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
            <li className="nav-item" id="searchStudent">
              <Link to={"/Users"} className="nav-link">
                Search User
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
              <Link to={"/student-list"} className="nav-link">
                Student List
              </Link>
            </li>

            <li className="nav-item" id="addUser">
              <Link to={"/add"} className="nav-link">
                Add User
                <PersonAddIcon width="30" height="30" className="icons" style={{ color: "white" }}></PersonAddIcon>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to={"/advisor-list"} className="nav-link">
                Advisor List
              </Link>
            </li>
             
        
            <li className="nav-item">
              <Link to={"/login"} className="nav-link"data-bs-toggle="modal" data-bs-target="#exampleModal">
                Log Out
                <LogoutIcon className='d-inline-block align-text-top'style={{ color: "white" }}></LogoutIcon>
              </Link>
            </li>




            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header" style={{backgroundColor:"#CD4631", color:"white"}}>
                     <WarningAmberIcon></WarningAmberIcon>
                    <h5 className="modal-title" id="exampleModalLabel">   Sign Out Confirmation</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Selecting confirm will return you to the Sign In screen where you will have to re-enter your details
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close<CloseIcon></CloseIcon></button>
                    <Link to={"/login"} className="nav-link">

                    <button type="button" className="btn btn-primary"data-bs-dismiss="modal">Confirm<DoneIcon></DoneIcon></button>
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