import React, { Component } from 'react';
import UserDataService from "../services/register.service";
import { withRouter } from '../common/router';
//import { response } from '../../../backend/app';
//import { map, render } from '../../../backend/app';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Navbar from './navbar.component';
import '../styles/searchPage.scss'

class Register extends Component {
    constructor(props) {
        super(props);

        this.getRegister = this.getRegister.bind(this);

        this.state = {
            currentRegister : {
                id: null,
                datetime: null,
                userList: []
            }
        }

    }

    componentDidMount(){
        this.getRegister(this.props.router.params.id)
    }

    getRegister(id){
        UserDataService.get(id)
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

    // getAllRegisters(){
    //     UserDataService.getAllRegisters()
    //     .then(response => {

    //     })
    // }

    updateRegister(){
        UserDataService.update(
            this.state.currentRegister.id,
            this.state.currentRegister
        ).then(response => {
            console.log(response.data);
            this.setState({
              message: "Register updated"
            });
          })
          .catch(e => {
            console.log(e);
          });
        
    }


    render() {
    
        const {currentRegister} = this.state;
        return(
      <div>
                      <Navbar/>
        <div className="col-md-2 mx-auto" >


               <div className='container-sm' id='paddingContainer'>
                <h1>Edit Register 
                <AppRegistrationIcon className="icons">
                </AppRegistrationIcon>
                </h1>
               </div>
        {currentRegister ? (
          <div className="edit-form">
            <h4>Register</h4>
            <form>
              <div className="form-group">
                <label htmlFor="datetime">Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentRegister.datetime}
                />
                </div>
                </form>
              </div>
              ): (
                <div>
                  <br />
                  <p>Why is this needed?</p>
                </div>
              )}
              </div>
            </div>
            
              
        );
    }
}

export default withRouter(Register);