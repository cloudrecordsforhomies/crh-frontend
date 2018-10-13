import React, { Component } from "react";
import "../styles/ContractHome.css";
import { Thumbnail, Button } from "react-bootstrap";



export default class ContractHome extends Component {

  constructor(props){
    super(props);
    this.querySecret = this.querySecret.bind(this);
  }

  querySecret(){
    
    //document.getElementById('secretPlace').innerHTML = ReactExample.getSecret();
  }


  render(){
    return (
      <div>
        <h2> Home of the contracts </h2>
        <br/><br/>
        <Thumbnail style={{"width":"337px", "margin":"0 auto", "textAlign":"center"}}>
          <h3> Contract Interaction </h3>
          <hr/>
          <Button onClick={this.querySecret}> Get String from Contract </Button>
          <br/>
          <br/>
          <ol id="secretPlace"></ol>
        </Thumbnail>

      </div>
    );
  }

}
