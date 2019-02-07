import React from 'react';
import SpotIndexItem from './spot_index_item';


class SpotIndex extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const spotDisplay = this.props.spots.map( (spot) => {
      return (
        <SpotIndexItem key={spot.id} spot={spot}
          updateBounds={this.props.updateBounds}
          />
      );
    });

    return (
      <div className='spot-index'>
        {spotDisplay}
      </div>
    );
  }
}

export default SpotIndex;
