import { Redirect } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

export default class MarkerManager extends React.Component {
  constructor(map, props) {
    super(props);
    this.map = map;
    this.history = this.props.history;
    this.markers = {};
  }

  updateMarkers(spots) {
    const spotsObj = {};
    spots.forEach( spot => spotsObj[spot.id] = spot);

    spots.filter( spot => !this.markers[spot.id])
      .forEach( newSpot => this.createMarkerFromSpot(newSpot));

    Object.keys(this.markers).filter(spotId => !spotsObj[spotId])
      .forEach( (spotId) => this.removeMarker(this.markers[spotId]));
  }

  createMarkerFromSpot(spot) {
    const marker = new google.maps.Marker({
      position: { lat: spot.lat, lng: spot.lng },
      map: this.map,
      spotId: spot.id,
      animation: google.maps.Animation.DROP,
    });

    marker.setMap(this.map);
    marker.addListener('click', () => {
      this.history.push(`/spots/${spot.id}`);
    });
    this.markers[marker.spotId] = marker;
  }

  removeMarker(marker) {
    this.markers[marker.spotId].setMap(null);
    delete this.markers[marker.spotId];
  }
}
