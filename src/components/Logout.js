import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Thumbnail } from "react-bootstrap";
import "../styles/Login.css";
import axios from 'axios';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    sessionStorage.clear();
    this.props.history.push('/');
  }
}
