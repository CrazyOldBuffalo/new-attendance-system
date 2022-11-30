import React, { Component } from 'react';
import UserDataService from "../services/user.service";
import '../styles/login.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoginIcon from '@mui/icons-material/Login';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

class LogIn extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.removeAllUsers = this.removeAllUsers.bind(this);
        this.searchUsername = this.searchUsername.bind(this);

        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
            searchUsername: ""
        };
    }

    componentDidMount(){
        this.retrieveUsers();
    }

    onChangeSearchUsername(e) {
        const searchUsername = e.target.value;

        this.setState({
            searchUsername: searchUsername
        });
    }

    retrieveUsers(){
        axios.get("http://localhost:3000/user/")
        .then(response => {
            this.setState({
                users: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveUsers();
        this.setState({
            currentUser: null,
            currentIndex: -1
        });
    }

    setActiveUser(user, index) {
        this.setState({
          currentUser: user,
          currentIndex: index
        });
    }

    removeAllUsers() {
        UserDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
        });
      }

    searchUsername() {
        axios.get("http://localhost:3000/user/find/" + this.state.searchUsername)
          .then(response => {
            this.setState({
              users: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
        });
      }
      

    render(){

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
                    <button className="btn btn-outline-success"  id="logLink"> Create Account <AddCircleOutlineIcon/></button>
                    </Link>

                  </div>
                  <div className="p-2" style={{paddingTop:"20px"}}>
                    
                      
                    
                    <Link to={"/Navbar"} className="navbar-brand" id='logIn'>
                    <button className="btn btn-success"  id="logLink"> Log In <LoginIcon></LoginIcon></button>
                    </Link>
                   
                </div>
                </div>

        </div>
        </div>   
        
    );
    
  }
}

export default LogIn;