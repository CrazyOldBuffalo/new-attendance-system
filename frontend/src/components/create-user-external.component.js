import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Alert from '@mui/material/Alert';
var bcrypt = require("bcryptjs");


class AddUserExternal extends Component {

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

      message: "",
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
        password: bcrypt.hashSync(data.password, 8),
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
          message: "The User was created successfully!"
        });
        //console.log(response.data);
        //console.log(response.status)
        if (response.status === '200') {
          console.log('great success')
          document.getElementById('responseMessageSuccess').style.visibility = 'visible'
          document.getElementById('responseMessageError').style.visibility = 'hidden'

        }

      })
      .catch(e => {
        console.log(e);

        console.log('boo boo')
        document.getElementById('responseMessageSuccess').style.visibility = 'hidden'
        document.getElementById('responseMessageError').style.visibility = 'visible'
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
      <div>

        <div className="col-md-2 mx-auto" >
          <div className="submit-form" style={{ maxWidth: "600px", justifyContent: "center", padding: "50px 0px 0px" }}>

            <div className='container-sm' id='paddingContainer'>
              <h1>Add Student
                <PersonAddAlt1Icon className="icons">
                </PersonAddAlt1Icon>
              </h1>
            </div>


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
                  <label htmlFor="username">Username<span className='required'>*</span></label>
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
                  <label htmlFor="password">Password<span className='required'>*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    name="password"
                  />

                </div>

                <div className="form-group">
                  <label htmlFor="email">Email<span className='required'>*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    name="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telephone">Telephone No.<span className='required'>*</span></label>
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
                <div className="d-flex justify-content-between">

                  <button onClick={this.saveUser} className="btn btn-success" id='submitBtn'>
                    Submit
                  </button>
                  <Link to={"/login"} className="navbar-brand">
                    <button className="btn btn-outline-success" id="logLink"> Continue To Sign In </button>
                  </Link>


                </div>

                {/* <p>{this.state.message}</p> */}
              </div>

            )}


            <Alert severity="error" id='responseMessageError' className='errorAlert'> Error: Please check all required fields are populated</Alert>
            <Alert severity="success" id='responseMessageSuccess' className='errorAlert'>User created successfully</Alert>

          </div>

        </div>
      </div>

    );
  }
}

export default AddUserExternal;