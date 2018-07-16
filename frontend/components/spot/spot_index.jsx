import React from 'react';
import SpotIndexItem from './spot_index_item';


export default ({ spots, updateBounds }) => {
  if (!spots) {
    spots = [];
  }

   const spotDisplay = spots.map( (spot) => {
     return (
       <SpotIndexItem key={spot.id} spot={spot}
        updateBounds={updateBounds}
        />
     );
   });

  return (
    <div className='spot-index'>
      {spotDisplay}
    </div>
  );
};
