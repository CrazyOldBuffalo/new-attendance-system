import React, { Component, useState } from 'react';
import UserDataService from "../services/register.service";
import { withRouter } from '../common/router';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeStudentStatus = this.onChangeStudentStatus.bind(this); // updates status of student alreaduy in register

    // this.onChangeRegisterItems = this.onChangeRegisterItems.bind(this); // adds new student to register

    this.getRegister = this.getRegister.bind(this);
    this.addRegisterItem = this.addRegisterItem.bind(this);
    this.updateRegisterItem = this.updateRegisterItem.bind(this);
    this.deleteRegister = this.deleteRegisterItem.bind(this);

    this.state = {
      currentRegister: {
        dateTime: null,
        attendanceList: []
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getRegister(this.props.router.params.id);
    console.log(this.props.router.params.id);
  }

  onChangeStudentStatus(e) {
    const username = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          username: username
        }
      };
    });
  }

  getRegister(id) {
    axios.get("http://localhost:3000/Register/" + id)
      .then(response => {
        this.setState({
          currentRegister: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


    //  NOT SURE IF THIS IS RELEVANT TO US

  
  // onChangeUpdatePublished(status) {
  //   var data = {
  //     dateTime: this.state.currentRegister.dateTime,
  //     attended: this.state.currentRegister.attended,
  //     studentID: this.state.currentRegister.studentID
  //   };

  //   UserDataService.update(this.state.currentRegister.id, data)
  //     .then(response => {
  //       this.setState(prevState => ({
  //         currentRegister: {
  //           ...prevState.currentRegister,
  //           published: status
  //         }
  //       }));
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  addRegisterItem(data){
    axios.put("http://localhost:3000/Register/Add/:id" + this.state.currentRegister.dateTime, data)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Register Item was added successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateRegisterItem(data) {
    axios.put("http://localhost:3000/Register/Update/:id" + this.state.currentRegister.dateTime, data)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Register was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteRegisterItem(data) {

  }

  render() {
    const { currentRegister } = this.state;

    return (
      <div>
        {currentRegister ? (
          <div className="edit-form">
            <h4>Register</h4>
            <form>
              <div className="form-group">
                <label htmlFor="dateTime">Datetime</label>
                <input
                  type="text"
                  disabled={true}
                  className="form-control"
                  id="datetime"
                  value={currentRegister.dateTime}
                />
              </div>
              {console.log(currentRegister.attendanceList)}
               <div className="form-group">
                <p id="registeItemList">

                </p>
                <label htmlFor="password">Password</label>
                {/* <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={currentUser.password}
                  onChange={this.onChangePassword}
                /> */}
                {currentRegister.attendanceList.forEach( registerItem => {
                  document.getElementById("registeItemList").append(registerItem);
                })}
              </div>
              {/*
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telephone">Telephone No.</label>
                <input
                  type="text"
                  className="form-control"
                  id="telephone"
                  value={currentUser.telephone}
                  onChange={this.onChangeTelephone}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status: </strong>
                </label>
                {currentUser.published ? " Published" : " Pending"}
              </div>
              */}
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteRegisterItem}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRegisterItem}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
        </div> 
        )}
      </div>
    );
  }
}


export default withRouter(Register);