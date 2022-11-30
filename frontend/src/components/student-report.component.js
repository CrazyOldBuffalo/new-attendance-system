import React, { Component } from 'react';
import { withRouter } from '../common/router';
import axios from 'axios';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Navbar from './navbar.component';
class StudentReport extends Component {
  constructor(props) {
    super(props);

    this.getUser = this.getUser.bind(this);
    this.formatData = this.formatData.bind(this);

    this.state = {
      currentStudent: {
        id: null,
        studentID: "",

      },
      attendanceData: [],
      message: "",
    };
  }

  componentDidMount() {
    this.getUser(this.props.router.params.id);
  }

 
  getUser(id) {
    axios.get("http://localhost:3000/student/find/" + id)
      .then(response => {
        this.setState({
          currentStudent: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
    axios.get("http://localhost:3000/student/attendance/" + id).then(response => {
      this.formatData(response.data, id);
    })
    .catch(e => {
      console.log(e);
    });
  }

  formatData(attendanceData, id) {
    var data = [];
    attendanceData.modules.forEach(i => {
        i.classes.forEach(j => {
          j.register.attendanceList.forEach(k => {
            data.push(k);
          });
        })
    });
    const test = data.filter(x => {return x.students.studentID === id});
    this.setState({
      attendanceData: test
    });
  }



  render() {
    const { currentStudent, attendanceData } = this.state;

    return (

      <div>
        <Navbar/>
        <div className="col-md-5 mx-auto" >
          <div className='container-sm' id='paddingContainer'>
            <h1>Edit User 
            <ManageAccountsIcon className="icons">
            </ManageAccountsIcon> 
            </h1>
          </div>

        {currentStudent ? (
          <div className="edit-form">
            <h4>User</h4>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  disabled={true}
                  className="form-control"
                  id="username"
                  value={currentStudent.studentID}
                  onChange={this.onChangeUsername}
                />
              </div>
              <table></table>
              {
                attendanceData.forEach(e => {
                  console.log(e);
                })
              }
              
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


export default withRouter(StudentReport);