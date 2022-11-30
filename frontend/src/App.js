
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import './styles/nav.scss'
import User from './components/user.component';
import AddUser from './components/add-user.component';
import UsersList from './components/users-list.component';
import Register from './components/register.component';
import RegisterList from './components/register-list.component';
import LogIn from './components/log-in.component';
import AddUserExternal from './components/create-user-external.component';
import AdvisorList from './components/academicadvisor-List.component';
import Navbar from './components/navbar.component';
import StudentList from './components/student-list.component';
import StudentReport from './components/student-report.component';


class App extends Component {
  render() {
    return (
      <div>

      <Router>


      <Routes>
      <Route path="/" element={<LogIn/>} />

        <Route path="/login" element={<LogIn/>} />
        <Route path="createUser" element={<AddUserExternal/>}/>
        <Route path="/Navbar" element={<Navbar/>}/>
        <Route path="/users" element={<UsersList/>} />
        <Route path="/add" element={<AddUser/>} />
        <Route path="/users/:id" element={<User/>} />
        <Route path="/register/:id" element={<Register/>} />
        <Route path="/register-list" element={<RegisterList/>} />
        <Route path="/advisor-list" element={<AdvisorList/>} />
        <Route path="/student-list" element={<StudentList/>}/>
        <Route path="/student/report/:id"  element={<StudentReport/>}/>
      </Routes>
    </Router>
    </div>
    )
  };
}

export default App;
