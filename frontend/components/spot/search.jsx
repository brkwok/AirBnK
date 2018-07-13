import React from 'react';
import SpotIndex from './spot_index';

class Search extends React.Component{

  componentDidMount() {
    this.props.fetchSpots();
  }

  render () {
    return(
      <div className="background-search">
        <SpotIndex spots={this.props.spots} fetchSpots={this.props.fetchSpots} />
      </div>
    );
  }
}

export default Search;
