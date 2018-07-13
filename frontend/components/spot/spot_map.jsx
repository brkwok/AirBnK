import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

class SpotMap extends React.Component {
  componentDidMount() {
    const mapOptions = {
      center: { lat: 40.752316, lng: -73.985951 },
      zoom: 13
    };

    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
  }

  render() {
    return(
      <div className='map-container' ref='map'>
      </div>
    );
  }
}

export default SpotMap;
