import React, { Component } from 'react';
import UserDataService from "../services/user.service";
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';

class UsersList extends Component {
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
        axios.get("http://localhost:3000/user/" + this.state.searchUsername)
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
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by username"
              value={searchUsername}
              onChange={this.onChangeSearchUsername}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchUsername}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.username}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>username:</strong>
                </label>{" "}
                {currentUser.username}
              </div>
              <div>
                <label>
                  <strong>password:</strong>
                </label>{" "}
                {currentUser.password}
              </div>
              <div>
                <label>
                  <strong>email:</strong>
                </label>{" "}
                {currentUser.email}
              </div>
              <div>
                <label>
                  <strong>telephone:</strong>
                </label>{" "}
                {currentUser.telephone}
              </div>
              <div>
                <label>
                  <strong>can edit Module? :</strong>
                </label>{" "}
                {currentUser.canEditModule}
              </div>

              <div>
                <label>
                  <strong>can edit Course?:</strong>
                </label>{" "}
                {currentUser.canEditCourse}
              </div>

              <Link
                to={"/users/" + currentUser.id}
                className="badge badge-warning"
              >
                Edit
              </Link>

              
              {/* <button
                to={"/users/" + currentUser.id}
                className="badge badge-warning"
              >
                Edit
              </button> */}

            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UsersList;