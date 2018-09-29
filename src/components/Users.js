import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "../styles/Users.css";

export default class Users extends Component {

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
            <tr>
              <td> -1 </td>
              <td> <a href="/profile"> Safa </a> </td>
              <td> Tinaztepe </td>
              <td> <span>safa.tinaztepe@email.com </span> </td>
              <td> -1,-1,-1 </td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
