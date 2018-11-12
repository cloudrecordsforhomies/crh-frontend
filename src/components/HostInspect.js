import React, { Component } from "react";
import axios from 'axios';
import "../styles/HostInspect.css";


export default class HostInspect extends Component {

  constructor(props){
    super(props)
    this.state = {
    }

  }

  render() {
    return (
      <body>
      <div class="row">
          <div class="col-xs-12 col-md-12 detail-component-area">
              <div class="row detail-view">
                  <div class="col-md-offset-1"></div>
                  <div class="detail-book-host col-xs-12 col-md-5">
                      <div class="detail-box clearfix">
                          <div class="col-xs-12 col-md-12 own-space space-title">
                              <p class="space-title">This is your space!</p>
                          </div>
                          <div class="col-xs-12 col-md-12 own-space space-info">
                              <p class="space-desc">basement</p>
                              <p class="space-address">Atlanta, GA</p>
                              <hr class="divider"></hr>
                          </div>
                          <div class="col-xs-12 col-md-12 own-space space-pricing">
                              <h3>$225.00/month</h3>
                              <p class="small">for the whole space</p>
                          </div>
                      </div>
                      <div class="detail-box clearfix ">
                          <div class="reviews-container">
                              <p class="review-section-header">Reviews</p>
                              <p class="no-reviews">No reviews yet.</p>
                          </div>
                      </div>
                  </div>
                  <div class="detail-picture-display col-xs-12 col-md-7">
                      <div class="detail-placeholder-pic"><img class="detail-placeholder-pic" src="https://i.redd.it/vk8sul532hw11.jpg" />Description</div>
                      <hr />
                      <div class="col-md-6 detail-badge detail-type">
                          <p class="capitalize">
                              <img class="space-detail-icon-area" src="https://i.redd.it/vk8sul532hw11.jpg" alt="BASEMENT" width="24" height="24" />
                              <span>
                              </span>
                          </p>
                      </div>
                      <div class="col-md-12 description-text"><span><span>asdf</span><br/></span></div>
                  </div>
              </div>
          </div>
      </div>
      </body>
    );
  }

}
