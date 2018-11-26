import React, { Component } from "react";
import "../styles/Footer.css";

export default class Footer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <footer class="the-footer">
          <div class="footer-col connect-wrapper">
              <p class="connect-with-us">Connect with us:</p>
              <div class="social-media-wrapper"><a target="_blank" href="https://www.facebook.com/stachethings"><img class="fa-facebook" src="" alt="FB" /></a><a target="_blank" href="https://www.twitter.com/stachethings"><img class="social-media-icn twitter-icn fa-twitter" src="" alt="Twitter"/></a><a target="_blank" href="https://www.instagram.com/stachethings"><img class="social-media-icn" src="" alt="Instagram"/></a></div>
              <p class="copyright-left"> © 2018 Cache, Inc</p>
          </div>
          <hr class="hr-hidden-until" />
          <div class="links-col-wrapper">
              <div class="footer-col links-col">
                  <p class="footer-title">LEARN</p>
                  <a class="footer-link" href="/howtohost"><span>How to host</span></a><a class="footer-link" href="/howtorent"><span>How to rent</span></a><a class="footer-link" href="/faq"><span>FAQ</span></a>
              </div>
              <div class="footer-col links-col">
                  <p class="footer-title">PEOPLE</p>
                  <a class="footer-link" href="/contact"> Contact us </a><a class="footer-link" href="/about"><span>About us</span></a>
              </div>
              <div class="footer-col links-col">
                  <p class="footer-title">COMPANY</p>
                  <a class="footer-link" href="/privacy"><span>Privacy policy</span></a><a class="footer-link" href="/terms"><span>Terms of service</span></a>
              </div>
          </div>
      </footer>
    );
  }
}
