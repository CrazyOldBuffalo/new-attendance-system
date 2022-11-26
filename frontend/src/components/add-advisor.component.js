import React, { Component } from 'react';
import advisorService from '../services/advisor.service';
import { Link, NavLink } from "react-router-dom";
import axios, { Axios } from 'axios';

class AddAdvisor extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearchAdvisor = this.onChangeSearchAdvisor.bind(this);
        this.retriveAdvisors = this.retriveAdvisors.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveAdvisor = this.setActiveAdvisor.bind(this);
        this.searchAdvisor = this.searchAdvisor.bind(this);

        this.state = {
            advisors: [],
            currentAdvisor: null,
            currentIndex: -1,
            searchAdvisor: ""
        };
    }

    componentDidMount(){
        this.retrieveUsers();
    }

    onChangeSearchAdvisor(e) {
        const searchAdvisor = e.target.value;

        this.setState({
            searchAdvisor: searchAdvisor
        });
    }

    retriveAdvisors(){
        advisorService.getAll()
        .then(response => {
            this.setState({
                advisors: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveUsers();
        this.setState({
            currentAdvisor: null,
            currentIndex: -1
        });
    }

    setActiveAdvisor(advisor, index) {
        this.setState({
          cuurentAdvisor: advisor,
          currentIndex: index
        });
    }

    searchAdvisor() {
        advisorService.searchAdvisor(this.state.searchAdvisor)
          .then(response => {
            this.setState({
              advisors: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
        });
      }

    render(){
   const { searchAdvisor, advisors, currentAdvisor, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by username"
              value={searchAdvisor}
              onChange={this.onChangeSearchAdvisor}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchAdvisor}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Advisor List</h4>

          <ul className="list-group">
            {advisors &&
              advisors.map((advisor, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.searchAdvisor(advisor, index)}
                  key={index}
                >
                  {advisor.academicAdvisorID}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentAdvisor ? (
            <div>
              <h4>Advisor</h4>
              <div>
                <label>
                  <strong>Advisor ID:</strong>
                </label>{" "}
                {currentAdvisor.academicAdvisorID}
              </div>
              <div>
                <label>
                  <strong>Students:</strong>
                </label>{" "}
                {currentAdvisor.students}
              </div>

              <Link
                to={"/advisors/" + currentAdvisor.academicAdvisorID}
                className="badge badge-warning"
              >
                Edit
              </Link>
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

export default AddAdvisor;