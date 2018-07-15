

export default class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = {};
  }

  updateMarkers(spots) {
    spots.map(
      spot => {
        if (!this.markers[spot.id]) {
          return this.createMarkerFromSpot(spot);
        }
      }
    );
  }

  createMarkerFromSpot(spot) {
    const marker = new google.maps.Marker({
      position: { lat: spot.lat, lng: spot.lng },
      map: this.map,
    });

    marker.setMap(this.map);
    this.markers[spot.id] = marker;
  }
}
