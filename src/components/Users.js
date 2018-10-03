import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "../styles/Users.css";

export default class Users extends Component {

  constructor(props){
    super(props);

    this.state = {
      users: [{id:-1,
               first:"Safa",
               last:"Tinaztepe",
               email:"safa.tinaztepe@gmail.com",
               activeBookings: [-1,-1,-1]}
             ]
    }
  }

  componentDidMount(){
    // populate all state with GET from users
  }

  createTable(){
    let table = [];
    for(var user of this.state.users){
      let children = [];
      for(var key in user){
        children.push(user[key] instanceof Array ? <td>{user[key].join(", ")}</td> : <td>{user[key]}</td>)
      }
      table.push(<tr>{children}</tr>);
    }
    return table
  }

  render() {
    return (
      <div className="Users">
        <h2> Users List </h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th> Id </th>
              <th> First Name </th>
              <th> Last Name </th>
              <th> Email </th>
              <th> Active Bookings </th>
            </tr>
          </thead>
          <tbody>
            {this.createTable()}
          </tbody>
        </Table>
      </div>
    )
  }
}
