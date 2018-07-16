

export default class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = {};
  }

  updateMarkers(spots) {
    // let spotsObj = spots.map(
    //   spot => {
    //     if (!this.markers[spot.id]) {
    //       return this.createMarkerFromSpot(spot);
    //     }
    //   }
    // );
    //
    // Object.keys(this.markers).forEach( (spotId) => {
    //   if (!spotsObj[spotId]) {
    //     this.removeMarker(this.markers[spotId]);
    //   } else {
    //     this.markers[spotId] = spotsObj[spotId];
    //   }
    // });
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
      spotId: spot.id
    });

    marker.setMap(this.map);
    this.markers[marker.spotId] = marker;
  }

  removeMarker(marker) {
    this.markers[marker.spotId].setMap(null);
    delete this.markers[marker.spotId];
  }
}
