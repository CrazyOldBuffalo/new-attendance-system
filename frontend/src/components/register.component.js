import React, { Component, useState } from 'react';
import UserDataService from "../services/register.service";
import { withRouter } from '../common/router';
import axios from 'axios';
import Navbar from './navbar.component';

class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeStudentStatus = this.onChangeStudentStatus.bind(this); // updates status of student alreaduy in register

    // this.onChangeRegisterItems = this.onChangeRegisterItems.bind(this); // adds new student to register

    this.getRegister = this.getRegister.bind(this);
    this.addRegisterItem = this.addRegisterItem.bind(this);
    this.updateRegisterItem = this.updateRegisterItem.bind(this);
    this.deleteRegister = this.deleteRegisterItem.bind(this);
    this.onChangeStudentID = this.onChangeStudentID(this);
    this.onChangeAttendanceStatus = this.onChangeAttendanceStatus(this);

    this.state = {
      currentRegister: {
        dateTime: null,
        attendanceList: [],
        currentIndex: -1,
        studentID: "",
        attendanceStatus: ""
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
    axios.get("http://localhost:3000/Register/FindOne/" + id)
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

  onChangeStudentID(e){
    const Id = e.target.value;
    this.setState({
      studentID: Id
    })
  }

  onChangeAttendanceStatus(e){
    const attendanceStatus = e.target.value;
    this.setState({
      attendanceStatus: attendanceStatus
    })

  }



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
    const { currentRegister, currentIndex, studentID, attendanceStatus } = this.state;

    return (
      <div>

        <Navbar></Navbar>

        <div className="col-md-5 mx-auto" >

          <div className='container-sm' id='paddingContainer'>
          <h1>Update Register</h1>
          </div>
        {currentRegister ? (
          <div className="edit-form">
            <h4>Register</h4>
            <form>
              <label>StudentID</label>
              <input type="text" value={studentID} onChange={this.onChangeStudentID}></input>
              <label>Status</label>
              <input type="text" value={attendanceStatus} onChange={this.onChangeAttendanceStatus}></input>
              <button>Add</button>
              <button>Edit</button>
            </form>
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
                <table className='table'>
                  <thead>
                  <tr>
                    <th>
                      Student
                    </th>
                    <th>
                      Attended
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    currentRegister.attendanceList.map((attendee, index) =>(
                      <tr key={index}>
                        <td>{attendee.students.studentID}</td>
                        {console.log(attendee.attended)}
                        <td>{attendee.attended.toString()}</td>
                      </tr>
                    ))
                  }

                  </tbody>
                </table>
              </div>
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
      </div>
    );
  }
}


export default withRouter(Register);