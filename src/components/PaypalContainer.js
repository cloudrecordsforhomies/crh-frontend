import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import axios from 'axios';

export default class PaypalContainer extends Component {
    constructor(props){
      super(props);
      this.state = {
        price: props.price,
        env: 'sandbox',
        currency:props.currency,
        client: {
            sandbox:    'AYVLFhv6FECzlMQapOii1SUI-CpLQvDRU4g8S8TIIK-ma2dCw9Fge2iGeKbM-AzEz0nAEbvsO9_Bp11-',
            production: 'Ab4XiqtK7mex4jSF9RQnv_Gr5vwpYftEkbM4EMcS-wh_h54Zyby9XGpchGcQuAuuJR_JQ8J-8zAxMpO4'
                }
      }
      this.onSuccess = this.onSuccess.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.onError = this.onError.bind(this);

    }

    onSuccess = (payment) => {
      var uid = localStorage.getItem("profile");
      const self = this;
      axios.post(`http://52.15.115.174:5000/booking/confirm/`, {renterId: uid, bId: self.props.bId})
           .then(function(){
             alert(`Payment succeeded! Booking ${self.props.bId} has been confirmed`);
       })
    }
    onCancel = (data) => {
        alert('The payment was cancelled!', data);
    }

    onError = (err) => {
        alert("Error!", err);
    }

    render() {
        return (
            <PaypalExpressBtn env={this.state.env} client={this.state.client} currency={this.state.currency} shipping={1} total={this.props.price} onError={this.onError} onSuccess={this.onSuccess} onCancel={this.onCancel} />
        );
    }
}
