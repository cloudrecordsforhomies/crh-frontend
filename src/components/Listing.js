import React, { Component } from "react";
import ListCard from "./ListCard.js";


export default class Listing extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <table>
        <th><h3> Where to store </h3></th>
        <tr>
          <td>
            <ListCard location="San Francisco" price={5} image="https://preview.redd.it/z2g2jdrgsws11.png?width=640&crop=smart&auto=webp&s=7fb3f99249f2ee5cd0a3b955b6ea56ce225e0f40"/>
          </td>
          <td style={{paddingLeft:5}}>
            <ListCard location="San Francisco" price={6} image="https://preview.redd.it/z2g2jdrgsws11.png?width=640&crop=smart&auto=webp&s=7fb3f99249f2ee5cd0a3b955b6ea56ce225e0f40"/>
          </td>
        </tr>
      </table>
    );
  }

}
