import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import MarkerManager from '../../util/marker_manager';
// import { fetchSpots } from '../../actions/spot_actions';
import { connect } from 'react-redux';

class SpotMap extends React.Component {
  componentDidMount() {
    //NY Coord
    const mapOptions = {
      center: { lat: 40.752316, lng: -73.985951 },
      zoom: 13
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);
    this.MarkerManager.updateMarkers(this.props.spots);
    this.addEventListener();
  }

  componentDidUpdate(prevProps) {
    if (this.props.spots !== prevProps.spots) {
      this.MarkerManager.updateMarkers(this.props.spots);
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

// const mdp = (dispatch) => {
//   return {
//     fetchSpots: (bounds) => dispatch(fetchSpots(bounds))
//   };
// };

export default SpotMap;
// export default connect(null, mdp)(SpotMap);
