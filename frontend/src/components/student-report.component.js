import React, { Component } from 'react';
import UserDataService from "../services/user.service";
import { withRouter } from '../common/router';
import axios from 'axios';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Navbar from './navbar.component';
class StudentReport extends Component {
  constructor(props) {
    super(props);

    this.getUser = this.getUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        studentID: ""
      },
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
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    axios.get("http://localhost:3000/student/attendance/" + id).then(response => {
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  render() {
    const { currentStudent } = this.state;

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
            <form>
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
              
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
              id="deleteBtn"

            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
              id="updateBtn"
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


export default withRouter(StudentReport);