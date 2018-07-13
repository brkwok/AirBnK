import React from 'react';
import SpotIndex from './spot_index';
import SpotMap from './spot_map';

class Search extends React.Component{

  componentDidMount() {
    this.props.fetchSpots();
  }

  render () {
    return(
      <div className="spots-container">
        <SpotIndex spots={this.props.spots} fetchSpots={this.props.fetchSpots} />
        <SpotMap />
      </div>
    );
  }
}

export default Search;
