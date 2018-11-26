import React, { Component } from "react";
import axios from 'axios';
import "../styles/RentInspect.css";


export default class RentInspect extends Component {

  constructor(props){
    super(props)
    this.state = {
    }

  }

  render() {
    return (
      <div class="row">
          <div class="col-md-12">
              <div class="row detail-view">
                  <div class="detail-book-host col-xs-12 col-md-5">
                      <div class="detail-box clearfix">
                          <div class="col-xs-12 col-md-12 detail-name-addr">
                              <p class="detail-name">Empty basement rec room</p>
                              <p class="detail-addr">Decatur, GA</p>
                              <span><span style="cursor: auto; display: inline-block; position: relative;"><span class="fa fa-star fa-1x display-empty-star"></span><span style="display: inline-block; position: absolute; overflow: hidden; top: 0px; left: 0px; width: 100%;"><span class="fa fa-star fa-1x display-filled-star"></span></span></span><span style="cursor: auto; display: inline-block; position: relative;"><span class="fa fa-star fa-1x display-empty-star"></span><span style="display: inline-block; position: absolute; overflow: hidden; top: 0px; left: 0px; width: 100%;"><span class="fa fa-star fa-1x display-filled-star"></span></span></span><span style="cursor: auto; display: inline-block; position: relative;"><span class="fa fa-star fa-1x display-empty-star"></span><span style="display: inline-block; position: absolute; overflow: hidden; top: 0px; left: 0px; width: 100%;"><span class="fa fa-star fa-1x display-filled-star"></span></span></span><span style="cursor: auto; display: inline-block; position: relative;"><span class="fa fa-star fa-1x display-empty-star"></span><span style="display: inline-block; position: absolute; overflow: hidden; top: 0px; left: 0px; width: 100%;"><span class="fa fa-star fa-1x display-filled-star"></span></span></span><span style="cursor: auto; display: inline-block; position: relative;"><span class="fa fa-star fa-1x display-empty-star"></span><span style="display: inline-block; position: absolute; overflow: hidden; top: 0px; left: 0px; width: 100%;"><span class="fa fa-star fa-1x display-filled-star"></span></span></span></span>
                              <hr class="divider"> </hr>
                          </div>
                          <div class="col-xs-12 col-md-12 detail-request-area">
                              <div class="col-xs-6 detail-cost-area">
                                  <div class="detail-cost">
                                      7
                                  </div>
                                  <div class="detail-sqft">
                                      50sqft
                                  </div>
                              </div>
                              <div class="col-xs-6"><button class="btn right-float-me space-detail-book-now-btn btn-request false">Begin Booking</button></div>
                          </div>
                      </div>
                      <div class="detail-box clearfix">
                          <div class="detail-host clearfix">
                              <div class="col-xs-7 col-sm-8 space-detail-user-avatar-div">
                                  <div class="user-avatar-table media">
                                      <div class="media-left"><img src="https://prod-img-stachethings.imgix.net/1303?fit=crop&amp;w=50&amp;h=50" class="img-circle" width="50" height="50" /></div>
                                      <div class="avatar-media-body media-body">
                                          <h4 class="avatar-heading-vertical-center media-heading">Kara L</h4>
                                      </div>
                                  </div>
                              </div>
                              <div class="col-xs-5 col-sm-offset-0 col-sm-4">
                                  <button class="btn btn-message-request false">
                                      Message Host
                                  </button>
                              </div>
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
                      <div class="pictures-display">

                          <div class="slider-wrapper axis-horizontal">
                              <div><img src="https://prod-img-stachethings.imgix.net/1300?w=2744&amp;h=1240&amp;fit=crop" alt="" class="img-responsive" /></div>
                          </div>
                          <button type="button" class="control-arrow control-next control-disabled"></button>
                      </div>
                  </div>
                  <div class="detail-review  col-md-7">
                      <div class="description-area">
                          <div class="detail-area-title primary-16">Description</div>
                          <div class="col-md-12 description-text"><span><span>We have a large, unused finished basement perfect for storing furniture, boxes, etc. There is ground level entry through the garage, so no stairs for moving!</span><br/></span></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
