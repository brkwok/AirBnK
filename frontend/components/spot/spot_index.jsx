import React from 'react';
import SpotIndexItem from './spot_index_item';

export default ({ spots, fetchSpots }) => {
  if (!spots) {
    spots = [];
  }

   const spotDisplay = spots.map( (spot) => {
     return (
       <SpotIndexItem key={spot.id} spot={spot} fetchSpots={fetchSpots}/>
     );
   });

  return (
    <div className='spot-index'>
      {spotDisplay}
    </div>
  );
};
