import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "../styles/Users.css";
import axios from 'axios';

export default class Users extends Component {

  constructor(props){
    super(props);

    this.state = {
    }

    axios.get('http://52.15.115.174:5000/users/').then( (res) => {
      this.createTable(res.data);
    });
  }


  createTable(data){
    let table = [];
    for(var user of data){
      let children = [];
      for(var key in user){
        children.push(`<td>${user[key]}</td>`)
      }

      table.push(`<tr>${children.join('')}</tr>`);
    }
    document.getElementById('target').innerHTML = table.join('');
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
              <th> Password </th>
              <th> phone </th>
              <th> profpic </th>
            </tr>
          </thead>
          <tbody id='target'>

          </tbody>
        </Table>
      </div>
    )
  }
}
