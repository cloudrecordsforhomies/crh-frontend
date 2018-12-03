import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from "react";

export class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentLocation: {},
      clickedLocation: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

  onMapClicked = (props, map, clickEvent) => {
      var clickLoc = clickEvent.latLng;
       this.setState({
         showingInfoWindow: false,
         activeMarker: null,
         clickedLocation: {
          lat: clickLoc.lat(),
          lng: clickLoc.lng()
        }
      });
      this.props.callback(clickLoc.lat, clickLoc.lng);
      console.log(this.state.clickedLocation);
  };

  render() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
              currentLocation: {
                  lat: coords.latitude,
                  lng: coords.longitude
              }
          })
        })
    }
    const style = {
      marginTop:'21px',
      width: '95%',
      height: '90%'
    }

    return (
      <Map
      style={style}
      google={this.props.google}
      zoom={14}
      onClick={this.onMapClicked}
      initialCenter={
        {lat: 33.794772,
        lng: -84.326590}
      }
      >

      <Marker
        onClick={this.onMarkerClick}
        name={"Current location"}
        location={this.state.currentLocation}
        position={this.state.currentLocation}
       />

      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
        <div>
          <h1>{this.state.selectedPlace.name}</h1>
          <h2>{JSON.stringify(this.state.selectedPlace.location)}</h2>
        </div>
      </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAhrGBawfLBRDKNuekWAIjV5XnPndRive4")
})(MapContainer)
