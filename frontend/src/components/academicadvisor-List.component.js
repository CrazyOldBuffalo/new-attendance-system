import React, { Component } from 'react';
import UserDataService from "../services/user.service";
import { Link, NavLink } from "react-router-dom";
import axios, { Axios } from 'axios';

class UsersList extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearchAdvisor = this.onChangeSearchAdvisor.bind(this);
        this.retriveAdvisors = this.retriveAdvisors.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveAdvisor = this.setActiveAdvisor.bind(this);
        this.searchAdvisor = this.searchAdvisor.bind(this);

        this.state = {
            advisors: [],
            currentAdvisor: null,
            currentIndex: -1,
            searchAdvisor: ""
        };
    }

    componentDidMount(){
        this.retrieveUsers();
    }

    onChangeSearchUsername(e) {
        const searchAdvisor = e.target.value;

        this.setState({
            searchAdvisor: searchAdvisor
        });
    }

    retriveAdvisors(){
        axios.get("http://localhost:3000/advisor/")
        .then(response => {
            this.setState({
                advisors: response.data
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
            currentAdvisor: null,
            currentIndex: -1
        });
    }

    setActiveUser(user, index) {
        this.setState({
          currentUser: user,
          currentIndex: index
        });
    }

    searchAdvisor() {
        axios.get("http://localhost:3000/advisor/find/" + this.state.searchUsername)
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
                {currentUser.canEditModule.toString()}
              </div>

              <div>
                <label>
                  <strong>can edit Course?:</strong>
                </label>{" "}
                {currentUser.canEditCourse.toString()}
              </div>

              <Link
                to={"/users/" + currentUser.username}
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