import React, { Component } from 'react';
import { withRouter } from '../common/router';
import axios from 'axios';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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

        <div>
          <table>
            <thead>
              <tr>
                <th>x</th>
              </tr>
            </thead>
            <tbody>
            {
            data.map((data, index) => (
              <tr key={index} className={index === currentIndex}>
                <td>{data.attended.toString()}</td>
              </tr>
            ))

          }
          </tbody>
          </table>
          {
            <p>Overall Attendance Indicator: {this.findTrue()} %</p>
          }          
        </div>
      </div>
    );
  }
}


export default withRouter(AdvisorReport);