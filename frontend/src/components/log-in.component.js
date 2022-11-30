import React, { Component } from 'react';
import '../styles/login.scss'
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Navbar from '../components/navbar.component.js';

import User from '../components/user.component';
import AddUser from '../components/add-user.component';
import UsersList from '../components/user.component'

import RegisterList from '../components/register-list.component';
import axios from 'axios';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LoginIcon from '@mui/icons-material/Login';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

var bcrypt = require("bcryptjs");

class LogIn extends Component {
    constructor(props) {
        super(props);

       
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
          username: "",
          password: "",
        };
    }

   

   handleLogin(){
    var data = {
      username: this.state.username,
      password: this.state.password,
     
    };
    axios.post("http://localhost:3000/petshop/auth/signin", data)
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        
        console.log(response.status);
        if(response.status ===200){
            console.log('user logged in');
        }
      }
      else{
        console.log("Incorrect Password");
      }
    })
    .catch(e => {
        console.log(e);
    });

   }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

      

  
      

    render(){
   const { searchUsername, users, currentUser, currentIndex } = this.state;
 

    return (
        <div className="submit-form">

        
       
        <div className="col-md-2 mx-auto" id ="logInModal"style={{backgroundImage:"linear-gradient(#9A4C95, #e2bcf3)", padding:"100px 20px 100px 20px",width:"500px"}}>
        <h1 className='title'> 
            Attendance Management <br/> Application
          <CalendarMonthIcon></CalendarMonthIcon>
        </h1>

            <div className="form-group">
                <label htmlFor="username">Username<span className='required'>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  required
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  name="username"
                  placeholder='Enter Username'
                />
            </div>

                 <div className="form-group">
                <label htmlFor="password">Password<span className='required'>*</span></label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    name="password"
                    placeholder='Enter Password'

                />

                </div>
                <div className="d-flex justify-content-between">
                <div className="p-2" style={{paddingTop:"20px"}}>
                    <Link to={"/createUser"} className="navbar-brand" id='createAcc'>
                    <button class="btn btn-outline-success"  id="logLink"role="button"> Create Account <AddCircleOutlineIcon/></button>
                    </Link>

                  </div>
                  <div className="p-2" style={{paddingTop:"20px"}}>   
                  <Link to={"/Navbar"}>        
                    <button class="btn btn-success"  id="logLink"role="button" onClick={this.handleLogin}> Log In <LoginIcon></LoginIcon></button>
                    </Link>
                </div>
                </div>

        </div>
        </div>   
        
    );
    
  }
}

export default LogIn;