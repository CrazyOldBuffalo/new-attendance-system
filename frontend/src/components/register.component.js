import React, { Component } from 'react';
import { withRouter } from '../common/router';
import axios from 'axios';
import Navbar from './navbar.component';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Upgrade from '@mui/icons-material/Upgrade';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

class Register extends Component {
  constructor(props) {
    super(props);

    //this.onChangeStudentStatus = this.onChangeStudentStatus.bind(this); // updates status of student alreaduy in register

    // this.onChangeRegisterItems = this.onChangeRegisterItems.bind(this); // adds new student to register

    this.getRegister = this.getRegister.bind(this);
    this.addRegisterItem = this.addRegisterItem.bind(this);
    this.updateRegisterItem = this.updateRegisterItem.bind(this);
    this.deleteRegisterItem = this.deleteRegisterItem.bind(this);
    this.onChangestudentID = this.onChangestudentID.bind(this);
    this.onChangeattendanceStatus = this.onChangeattendanceStatus.bind(this);
    this.onChangeClass = this.onChangeClass.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      currentRegister: {
        dateTime: null,
        attendanceList: [],
        currentIndex: -1,
        studentID: "",
        attendanceStatus: "",
        class1: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getRegister(this.props.router.params.id);
    console.log(this.props.router.params.id);
  }

  onChangestudentID(e) {
    this.setState({
      studentID: e.target.value
    })
  }

  onChangeattendanceStatus(e) {
    this.setState({
      attendanceStatus: e.target.value
    })
  }

  onChangeClass(e) {
    this.setState({
      class1: e.target.value
    });
  };

  refreshList() {
    this.getRegister(this.props.router.params.id);
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

  addRegisterItem() {
    console.log(this.state.studentID);
    console.log(this.state.attendanceStatus);
    var data = {
      studentID: this.state.studentID,
      attended: this.state.attendanceStatus,
      classID: this.state.class1,
    };
    axios.post("http://localhost:3000/Register/Add/:id" + this.state.currentRegister.dateTime, data)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Register Item was added successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });

    this.refreshList()
  }

  updateRegisterItem() {

    var data = {
      studentID: this.state.studentID,
      classID: this.state.class1,
      attended: this.state.attendanceStatus,
    };
    axios.put("http://localhost:3000/Register/Update/" + this.state.currentRegister.dateTime, data)
      .then(response => {
        this.setState({
          message: "The Register was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });

      this.refreshList();
  }

  deleteRegisterItem() {

    axios({
      method: "delete", url: "http://localhost:3000/Register/DeleteItem/" + this.state.currentRegister.dateTime, data: {
        studentID: this.state.studentID,
        classID: this.state.class1,
        attended: this.state.attendanceStatus
      }
    }).then(response => {
      this.setState({
        message: "Register Item Deleted"
      });
    })
      .catch(e => {
        console.log(e);
      });

      this.refreshList();
  };

  render() {
    const { currentRegister, currentIndex } = this.state;
    return (
      <div>

        <Navbar></Navbar>
        <div className="col-md-5 mx-auto" >
          <div className='container-sm' id='paddingContainer'>
            <h1>Update Register <Upgrade className='icons'/></h1>
          </div>
          {currentRegister ? (
            <div className="edit-form">
              <form>
                                
              <div className="d-flex justify-content-center">

              <div className='padding' style={{padding:"0px 20px 0px"}}>

                <label htmlFor='studentID'>StudentID</label>
                <input type="text" value={this.state.studentID} placeholder="Enter Student ID" onChange={this.onChangestudentID} name="studentID" id='studentIDField'></input>

              </div>

              <div className='padding' style={{padding:"0px 20px 0px"}}>

                <label htmlFor='attendanceStatus'>Status</label>
                <input type="text" value={this.state.attendanceStatus} placeholder="false" onChange={this.onChangeattendanceStatus} name="attendanceStatus"style={{width:"60px"}}id='attendanceStatusField'></input>

              </div>
              <div className='padding' style={{padding:"0px 20px 0px"}}>

                <label htmlFor='class1'>Class</label>
                <input type="text" value={this.state.class1} placeholder="CL123" onChange={this.onChangeClass} name="class1" style={{width:"60px"}}id='classIDfield'></input>
              </div>
              </div>

                <div className="d-flex justify-content-center">
                <div className='padding' style={{padding:"10px 20px 10px"}}>
                  <button onClick={this.addRegisterItem}className="btn btn-outline-success" id='addButton'>Add <AddCircleIcon/></button>
                  </div>
                  <div className='padding' style={{padding:"10px 20px 10px"}}>
                  <button onClick={this.updateRegisterItem}className="btn btn-outline-secondary" id='editButton'>Edit <EditIcon/></button>
                  </div>
                  <div className='padding' style={{padding:"10px 20px 10px"}}>
                  <button onClick={this.deleteRegisterItem}className="btn btn-outline-danger">Delete<DeleteForeverIcon/></button>
                  </div>

                </div>
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
                        currentRegister.attendanceList.map((attendee, index) => (
                          <tr key={index} className={(index === currentIndex)} >
                            <td>{attendee.students.studentID}</td>



                            <td>
                            {(() => {
                                  if (attendee.attended.toString()=='true'){
                                      return (
                                      
                                       <DoneOutlinedIcon id='attended'></DoneOutlinedIcon> 
                                      )
                                  }
                                  else if(attendee.attended.toString()=='false'){
                                    return(
                                        <ClearOutlinedIcon id='notAttended'/>
                                      )
                                  }
              
                              return null;
                            })()}


                            </td>


                            {/* <td>{attendee.attended.toString()}</td> */}
                          </tr>
                        ))
                      }

                    </tbody>
                  </table>
                </div>
              </form>

              <button
                className="btn btn-outline-danger"
                onClick={this.deleteRegisterItem}
              >
                Delete <DeleteForeverIcon/>
              </button>

              <button
                type="submit"
                className="btn btn-outline-success"
                onClick={this.updateRegisterItem}
              >
                Update <Upgrade/>
              </button>
              <p>{this.state.message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
              <span id='cyTest' style={{color:"white"}}></span>
            </div>
          )}
        </div>
      </div>
    );
  }
}


export default withRouter(Register);