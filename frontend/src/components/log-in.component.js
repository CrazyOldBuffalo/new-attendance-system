import React, { Component } from 'react';
import UserDataService from "../services/user.service";
import '../styles/login.scss'
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LoginIcon from '@mui/icons-material/Login';

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
   const { searchUsername, users, currentUser, currentIndex } = this.state;

    return (
        <div className="submit-form">

        <h1> 
          Sign In 
          <LoginIcon></LoginIcon>


        </h1>
       
        <div className="container-md">

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
                />

                </div>

                <button onClick={this.retrieveUsers} className="btn btn-success">
                Submit
              </button>

        </div>
        </div>
        
    );
  }
}

export default LogIn;