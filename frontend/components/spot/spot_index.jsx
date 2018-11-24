import React from 'react';
import SpotIndexItem from './spot_index_item';


class SpotIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maxCosts: null,
      minCosts: null,
      currMaxCosts: null,
      currMinCosts: null,
      maxGuests: null,
      minGuests: null,
      minCurrGuests: null,
      maxCurrGuests: null,
    };
  }

  componentDidMount() {
    const spots = Object.values(this.props.spots) || [];
    let costs = [];
    let guests = [];

    spots.forEach( (spot) => {
      costs.push(spot.cost);
      guests.push(spot.guests);
    });

    const [maxCosts, minCosts, maxGuests, minGuests] =
    [Math.max(...costs), Math.min(...costs), Math.max(...guests), Math.min(...guests)];

    this.setState({
      maxCosts,
      minCosts,
      currMaxCosts: maxCosts,
      currMinCosts: minCosts,
      maxGuests,
      minGuests,
      currMaxGuests: maxGuests,
      currMinGuests: minGuests,
    });
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
