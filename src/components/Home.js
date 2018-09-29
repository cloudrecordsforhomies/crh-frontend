import React, { Component } from "react";
import "../styles/Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Cache</h1>
          <p>Find and book a place to keep your shit</p>
          {/*
          <img src='https://media.istockphoto.com/photos/stacks-of-cardboard-boxes-picture-id509555584'
               alt='nothing to see here'
               className="marqueeImg repeat"/>
          */}
        </div>
      </div>
    );
  }
}
