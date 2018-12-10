import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from "react";
import axios from 'axios';
import '../styles/MapContainer.css';

export class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentLocation: props.place,
      clickedLocation: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
<<<<<<< HEAD
      locations: props.locations
    };    
=======
      locations: props.locations,
      place: props.place
    };
>>>>>>> b955e6541cf15564dd2c3bf912d2b161a87cff8e

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.populateListings = this.populateListings.bind(this);

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
      if(this.props.callback) this.props.callback(clickLoc.lat, clickLoc.lng);
      console.log(this.state.clickedLocation);
      var marker = new this.props.google.maps.Marker({position: this.state.clickedLocation, map: map});
  };

  populateListings = (props, map) => {
    var listings = this.state.locations;
    console.log(this.props.locations);
//     var self = this;
//     var testPos = {lat: 33.796, lng: -84.29}
//     var marker = new this.props.google.maps.Marker({position: testPos, map: map});
//     marker.addListener('click', function() {
//       self.setState({
//         selectedPlace: {name: "TEST", position: testPos},
//         activeMarker: marker,
//         showingInfoWindow: true
//       })
//     })
    listings.map(function(element) {
       var pos = {lat: element.lat, lng: element.lng}
       var marker = new this.props.google.maps.Marker({position: pos, map: map});
    });
  }

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

    const style = this.props.style;
    const mapoptions = {
      disableDefaultUI: true,
      gestureHandling: 'none'
    }


    return (
      <div className="container" style={{height:350, width:350}}>
      <Map
      style={style}
      google={this.props.google}
      zoom={14}
      onClick={this.onMapClicked}
<<<<<<< HEAD
      initialCenter={ !this.props.location ? {lat: 33.794772,lng: -84.326590} : this.props.location }
=======
      initialCenter={ !this.props.place ?
        {lat: 33.794772,
        lng: -84.326590}
        : this.props.place
      }
>>>>>>> b955e6541cf15564dd2c3bf912d2b161a87cff8e
      options={mapoptions}
      mapElement={<div style={{ height: `100px` }} />}
      //onReady={this.populateListings}
      >

      <Marker
        onClick={this.onMarkerClick}
        name={"Current location"}
        location={this.props.place? this.props.place : this.state.currentLocation}
        position={this.props.place? this.props.place : this.state.currentLocation}
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
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAhrGBawfLBRDKNuekWAIjV5XnPndRive4")
})(MapContainer)
