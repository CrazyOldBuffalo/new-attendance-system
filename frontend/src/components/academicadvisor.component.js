import React, { Component } from 'react';
import UserDataService from "../services/user.service";
import { withRouter } from '../common/router';
import axios from 'axios';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Navbar from './navbar.component';
import { Link } from "react-router-dom";
class AcademicAdvisor extends Component {
  constructor(props) {
    super(props);

    this.updatePublished = this.onChangeUpdatePublished.bind(this);
    this.getUser = this.getUser.bind(this);
    this.generateAttendanceData = this.generateAttendanceData.bind(this);
    this.onChangeStudentID = this.onChangeStudentID.bind(this);

    this.state = {
      currentUser: {
        id: null,
        username: "",
        password: "",
        email: "",
        telephone: "",
        canEditModule: "",
        canEditCourse: "",
        students: [],
        
      },
      studentID: "",
      message: "",
      attendance: []
    };
  }

  componentDidMount() {
    this.getUser(this.props.router.params.id);
  }

  getUser(id) {
    axios.get("http://localhost:3000/advisor/" + id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


    //  NOT SURE IF THIS IS RELEVANT TO US

  
  onChangeUpdatePublished(status) {
    var data = {
      id: this.state.currentUser.id,
      password: this.state.currentUser.password,
      email: this.state.currentUser.email,
      telephone: this.state.currentUser.telephone,
      canEditModule: this.state.currentUser.canEditModule,
      canEditCourse: this.state.currentUser.canEditCourse,
      published: status
    };

    UserDataService.update(this.state.currentUser.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  generateAttendanceData() {
    var datas = {
      studentID: this.state.studentID,
    };

    axios({method: "post", url: "http://localhost:3000/studentAttendanceData/", data: {
      studentID: this.state.studentID,
    }}).then(response => {
      console.log(response.data)
      });
  }

  onChangeStudentID(e){
    console.log(e.target.value);
    this.setState({studentID: e.target.value});
  }

  render() {
    const { currentUser, currentIndex } = this.state;
    return (
      <div>

        <Navbar></Navbar>
        <div className="col-md-5 mx-auto" >
          <div className='container-sm' id='paddingContainer'>
            <h1>Update Register</h1>
          </div>
        
          {currentUser ? (
            <div className="edit-form">
              <h4>Register</h4>
              
              <form>
                <div className="form-group">
                  <label htmlFor="dateTime">AcademicAdvisor ID</label>
                  <input
                    type="text"
                    disabled={true}
                    className="form-control"
                    id="datetime"
                    value={currentUser.academicAdvisorID}
                  />
                </div>
                <form>
                    <div className="form-group">
                    <label htmlFor="studentID">Student ID</label>
                    <input
                    type="text"
                    className="form-control"
                    id="studentID"
                    onChange={this.onChangeStudentID}
                    value={this.state.studentID}
                    placeholder="SU111"
                    >
                    </input>
                    </div>
                    <Link to={"/advisor-report/" + this.state.studentID} className="badge badge-warning">
                      report
                    </Link>
                </form>
                <div className="form-group">
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>
                          Student
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      { 
                        currentUser.students.map((student, index) => (
                          <tr key={index} className={(index === currentIndex)} >
                            <td>{student.studentID}</td>
                          </tr>
                        ))
                      } 

                    </tbody>
                  </table>
                </div>

              </form>
              {
                console.log(this.state.attendance)
              }
              

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
            </div>
          )}
        </div>
      </div>
    );
  }
}


export default withRouter(AcademicAdvisor);