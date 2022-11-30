import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Navbar from './navbar.component';

class StudentList extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearchStudentID = this.onChangeSearchStudentID.bind(this);
        this.retrieveStudents = this.retrieveStudents.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveStudent = this.setActiveStudent.bind(this);
        this.searchStudentID = this.searchStudentID.bind(this);

        this.state = {
            students: [],
            currentStudent: null,
            currentIndex: -1,
            searchStudent: ""
        };
    }

    componentDidMount(){
        this.retrieveStudents();
    }

    onChangeSearchStudentID(e) {
        const searchStudentID = e.target.value;

        this.setState({
            searchStudentID: searchStudentID
        });
    }

    retrieveStudents(){
        axios.get("http://localhost:3000/student/")
        .then(response => {
            this.setState({
                students: response.data
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
            currentStudent: null,
            currentIndex: -1
        });
    }

    setActiveStudent(student, index) {
        this.setState({
          currentStudent: student,
          currentIndex: index
        });
    }

    searchStudentID() {
        axios.get("http://localhost:3000/student/find/" + this.state.searchStudent)
          .then(response => {
            this.setState({
              students: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
        });
      }

    render(){
   const { searchStudent, students, currentStudent, currentIndex } = this.state;
    return (
      <div>
        
          <Navbar/>
          <div className="col-md-5 mx-auto" >

           <div className='container-sm' id='paddingContainer'>
          <h1>Search Student 



          <PersonSearchIcon className="icons">

          </PersonSearchIcon>


            
          </h1>
        </div>
      <div className="list row">


        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by username"
              value={searchStudent}
              onChange={this.onChangeSearchStudentID}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                id='searchBtn'
                type="button"
                onClick={this.searchStudent}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Students List</h4>

          <ul className="list-group">
            {students &&
              students.map((student, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveStudent(student, index)}
                  key={index}
                >
                  {student.studentID}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentStudent ? (
            <div>
              <h4>Student</h4>
              <div>
                <label>
                  <strong>username:</strong>
                </label>{" "}
                {currentStudent.studentID}
              </div>
        
              {console.log(currentStudent.studentID)}
              <Link
                
                to={"/student/report/" + currentStudent.studentID}
              >
                <button class="btn btn-outline-success">Generate Report <AssessmentIcon/> </button>

                
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
              <p>Please click on a Student...</p>
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
    );
  }
}

export default StudentList;