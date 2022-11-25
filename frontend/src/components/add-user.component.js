import axios from 'axios';
import React, { Component } from 'react';
import UserDataService from "../services/user.service";

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onChangeCanEditModule = this.onChangeCanEditModule.bind(this);
    this.onChangeCanEditCourse = this.onChangeCanEditCourse.bind(this);
    
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      _id: null,
      username: "",
      password: "",
      email: "",
      telephone: "",
      canEditModule: false,
      canEditCourse: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeTelephone(e) {
    this.setState({
      telephone: e.target.value
    });
  }

  onChangeCanEditModule(e) {
    this.setState({
      canEditModule: e.target.value
    });
  }

  onChangeCanEditCourse(e) {
    this.setState({
      canEditCourse: e.target.value
    });
  }

  saveUser() {
    var data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      telephone: this.state.telephone,
    };
      axios({
        method: "post", url: "http://localhost:3000/user/create", data: 
        {
          username: data.username,
          password: data.password,
          email: data.email,
          telephone: data.telephone,
        }
      })
      .then(response => {
        this.setState({
            username: response.data.username,
            password: response.data.password,
            email: response.data.email,
            telephone: response.data.telephone,
            canEditModule: response.data.canEditModule,
            canEditCourse: response.data.canEditCourse,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      username: "",
      password: "",
      email: "",
      telephone: "",
      canEditModule: false,
      canEditCourse: false,
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newUser}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  required
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  name="username"
                />
            </div>
  
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    className="form-control"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    name="password"
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  name="email"
                />  
            </div>

            <div className="form-group">
                <label htmlFor="telephone">Telephone No.</label>
                <input
                  type="text"
                  className="form-control"
                  id="telephone"
                  required
                  value={this.state.telephone}
                  onChange={this.onChangeTelephone}
                  name="telephone"
                />
            </div>

            <div className="form-group">
                <label htmlFor="canEditModule">Can Edit Module? </label>
                <input
                  type="checkbox" checked="checked"
                  className="form-control"
                  id="canEditModule"
                  required
                  value={this.state.canEditModule}
                  onChange={this.onChangeCanEditModule}
                  name="canEditModule"
                />
            </div>

            <div className="form-group">
                <label htmlFor="canEditCourse">Can Edit Course? </label>
                <input
                  type="checkbox"
                  
                  className="form-control"
                  id="canEditCourse"
                  required
                  value={this.state.canEditCourse}
                  onChange={this.onChangeCanEditCourse}
                  name="canEditCourse"
                />
            </div>
  
            <button onClick={this.saveUser} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
          </div>
    );
  }
}

export default AddUser;