import React, { Component } from "react";
import "../styles/About.css";

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
      <div>

        <div class="container">
          <div class="row">
            <div class="col-lg-3">

              <div class="card hovercard">
                <div class="cardheader">

                </div>
                <div class="avatar">
                    <img alt="" src={this.state.image}/>
                </div>
                <div class="info">
                    <div class="title">
                        <a target="_blank" href="https://scripteden.com/">{this.state.name}</a>
                    </div>
                    <div class="desc">{this.state.desc1}</div>
                    <div class="desc">{this.state.desc2}</div>
                    <div class="desc">{this.state.desc3}</div>
                </div>
                <div class="bottom">
                    <a class="btn btn-primary btn-twitter btn-sm" href="https://twitter.com/">
                        <i class="fa fa-twitter"></i>
                    </a>
                    <a class="btn btn-danger btn-sm" rel="publisher"
                       href={this.state.linkedin}>
                        <i class="fa fa-linkedin"></i>
                    </a>
                    <a class="btn btn-primary btn-sm" rel="publisher"
                       href={this.state.facebook}>
                        <i class="fa fa-facebook"></i>
                    </a>
                    <a class="btn btn-warning btn-sm" rel="publisher" href="https://plus.google.com/shahnuralam">
                        <i class="fa fa-behance"></i>
                    </a>
                </div>
            </div>

        </div>

  </div>
</div>

      </div>

    );
  }
}
