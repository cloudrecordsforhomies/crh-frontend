import React, { Component } from "react";
import "../styles/About.css";
import "../styles/bootstrap-social.css";
import "../styles/bootstrap-social stephen.css";

export default class About extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.name,
      facebook: props.facebook,
      desc1: props.desc1,
      desc2: props.desc2,
      desc3: props.desc3,
      linkedin: props.linkedin,
      image: props.image,
      github: props.github,
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSelection = event => {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    return (

      <div style={{marginLeft:"70px"}}>

              <div class="card hovercard">
                <div class="cardheader">

                </div>
                <div class="avatar">
                    <img alt="" src={this.state.image}/>
                </div>
                <div class="info">
                    <div class="title">
                        <a target="_blank" href={this.state.linkedin}>{this.state.name}</a>
                    </div>
                    <div class="desc">{this.state.desc1}</div>
                    <div class="desc">{this.state.desc2}</div>
                    <div class="desc">{this.state.desc3}</div>
                </div>
                <div class="bottom">

                    <a class="btn btn-social-icon btn-facebook" href = {this.state.facebook}>
                      <span class="fa fa-facebook"></span>
                    </a>

                    <a class="btn btn-social-icon btn-linkedin" href = {this.state.linkedin}>
                      <span class="fa fa-linkedin"></span>
                    </a>

                    <a class="btn btn-social-icon btn-github" href = {this.state.linkedin}>
                      <span class="fa fa-github"></span>
                    </a>

                </div>
            </div>

        </div>


    );
  }
}
