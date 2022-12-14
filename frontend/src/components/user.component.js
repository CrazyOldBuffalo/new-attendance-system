import React, { Component } from 'react';
import UserDataService from "../services/user.service";
import { withRouter } from '../common/router';
import axios from 'axios';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Navbar from './navbar.component';
class User extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onChangeCanEditModule = this.onChangeCanEditModule.bind(this);
    this.onChangeCanEditCourse = this.onChangeCanEditCourse.bind(this);

    this.updatePublished = this.onChangeUpdatePublished.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        username: "",
        password: "",
        email: "",
        telephone: "",
        canEditModule: "",
        canEditCourse: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getUser(this.props.router.params.id);
  }

  onChangeUsername(e) {
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

  onChangePassword(e) {
    const password = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentPassword,
        password: password
      }
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        email: email
      }
    }));
  }

  onChangeTelephone(e) {
    const telephone = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        telephone: telephone
      }
    }));
  }

  onChangeCanEditModule(e) {
    const canEditModule = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        canEditModule: canEditModule
      }
    }));
  }

  onChangeCanEditCourse(e) {
    const canEditCourse = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        canEditCourse: canEditCourse
      }
    }));
  }

  getUser(id) {
    console.log(id);
    axios.get("http://localhost:3000/user/" + id)
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
  

  updateUser() {
    axios.put("http://localhost:3000/user/Update/" + this.state.currentUser.username, this.state.currentUser)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The User was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    axios.delete("http://localhost:3000/user/Delete/" + this.state.currentUser.username)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/users');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

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

        {currentUser ? (
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
                  value={currentUser.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={currentUser.password}
                  onChange={this.onChangePassword}
                />
              </div>
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
                <label htmlFor="canEditModule">Can Edit Module?</label>
                <input
                  type="text"
                  disabled={true}
                  className="form-control"
                  id="module"
                  value={currentUser.canEditModule}
                  onChange={this.onChangeCanEditModule}
                />
              </div>

              <div className="form-group">
                <label htmlFor="canEditCourse">Can Edit Course?</label>
                <input
                  type="text" 
                  disabled={true}
                  className="form-control"
                  id="course"
                  value={currentUser.canEditCourse}
                  onChange={this.onChangeCanEditCourse}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status: </strong>
                </label>
                {currentUser.published ? " Published" : " Pending"}
              </div>
            </form>

            <button
              className="btn btn-outline-danger"
              onClick={this.deleteUser}
              id="deleteBtn"

            >
              Delete <DeleteForeverIcon/>
            </button>

            <button
              type="submit"
              className="btn btn-outline-success"
              onClick={this.updateUser}
              id="updateBtn"
            >
              Update<UpgradeIcon/>
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


export default withRouter(User);