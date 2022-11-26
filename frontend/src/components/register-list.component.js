import React, { Component } from 'react';
import UserDataService from "../services/register.service";
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';

class RegisterList extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearchDatetime = this.onChangeSearchDatetime.bind(this);
        this.retrieveRegisters = this.retrieveRegisters.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveRegister = this.setActiveRegister.bind(this);
        this.searchDatetime = this.searchDatetime.bind(this);

        this.state = {
            registers: [],
            currentRegister: null,
            currentIndex: -1,
            searchDatetime: ""
        };
    }

    componentDidMount(){
        this.retrieveRegisters();
    }

    onChangeSearchDatetime(e) {
        const searchDatetime = e.target.value;

        this.setState({
            searchDatetime: searchDatetime
        });
    }

    retrieveRegisters(){
        axios.get("http://localhost:3000/Register/getAll")
        .then(response => {
            this.setState({
                registers: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveRegisters();
        this.setState({
            currentRegister: null,
            currentIndex: -1
        });
    }

    setActiveRegister(register, index) {
        this.setState({
          currentRegister: register,
          currentIndex: index
        });
    }

    removeAllRegisters() {
        UserDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
        });
      }

    searchDatetime() {
        axios.get("http://localhost:3000/Register/Find/" + this.state.searchDatetime)
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
   const { searchDatetime, registers, currentRegister, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by datetime"
              value={searchDatetime}
              onChange={this.onChangeSearchDatetime}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchDatetime}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Register List</h4>

          <ul className="list-group">
            {registers &&
              registers.map((register, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveRegister(register, index)}
                  key={index}
                >
                  {register.dateTime}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentRegister ? (
            <div>
              <h4>Datetime</h4>
              <div>
                <label>
                  <strong>datetime:</strong>
                </label>{" "}
                {currentRegister.dateTime}
              </div>

              <Link
                to={"/users/" + currentRegister.dateTime}
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

export default RegisterList;