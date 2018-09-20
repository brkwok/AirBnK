import React from 'react';
// import ReactDOM from 'react-dom';
// import { withRouter } from 'react-router-dom';
import MarkerManager from '../../util/marker_manager';
// import { connect } from 'react-redux';

class SpotMap extends React.Component {
  componentDidMount() {
    //NY Coord
    const mapOptions = {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 11
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this.props.history);
    this.MarkerManager.updateMarkers(this.props.spots);
    this.addEventListener();
  }

  componentDidUpdate(prevProps) {
    if (this.props.spots !== prevProps.spots) {
      this.MarkerManager.updateMarkers(this.props.spots);
    }
    if (this.props.lat !== prevProps.lat) {
      this.map.setCenter({lat: this.props.lat, lng: this.props.lng});
      this.map.setZoom(11);
    }
  }


  addEventListener() {
    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };
      this.props.updateBounds(bounds);
    });
  }

  render() {
    return(
      <div className='map-container' ref={ map => this.mapNode = map }>
      </div>
    );
  }
}


export default SpotMap;
