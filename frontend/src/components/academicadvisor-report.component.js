import React, { Component } from 'react';
import { withRouter } from '../common/router';
import axios from 'axios';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Navbar from './navbar.component';
class AdvisorReport extends Component {
  constructor(props) {
    super(props);

    this.getUser = this.getUser.bind(this);

    this.state = {
      data: [],
      currentIndex: -1,
      truevalues: []
    };
  }

  componentDidMount() {
    this.getUser(this.props.router.params.id);
  }

 
  getUser(id) {
    axios.get("http://localhost:3000/studentAttendanceData/" + id)
      .then(response => {
        this.setState({
          data: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  findTrue() {
    this.state.truevalues = this.state.data.filter(x => {
      return x.attended === true
    })

    return (this.state.truevalues.length / this.state.data.length * 100)
  }

  //generateReport()



  render() {
    const { data, currentIndex } = this.state;

    return (

      <div>
        <Navbar/>

        <div style={{textAlign:"center"}}>
          <table>
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody style={{alignItems:"center"}}>
              <strong>Previous Attendance Indicators</strong>
            {
            data.map((data, index) => (
              <tr key={index} className={index === currentIndex}>

                <td>
                {(() => {
                      if (data.attended.toString()=='true'){
                          return (
                          
                            <DoneOutlinedIcon id='attended'></DoneOutlinedIcon> 
                          )
                      }
                      else if(data.attended.toString()=='false'){
                        return(
                            <ClearOutlinedIcon id='notAttended'/>
                          )
                      }
  
                  return null;
                })()}


                </td>
                
              </tr>
            ))

          }
          </tbody>
          </table>
          {
            <h1>Overall Attendance Indicator:<strong> {this.findTrue()} %</strong></h1>
          }          
        </div>
      </div>
    );
  }
}


export default withRouter(AdvisorReport);